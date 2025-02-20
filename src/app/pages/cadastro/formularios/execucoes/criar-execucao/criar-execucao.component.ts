import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormComponentType } from 'src/app/core/models/form-component.entity';
import { IForm } from 'src/app/core/models/form.entity';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { FormService } from 'src/app/shared/services/form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criar-execucao',
  templateUrl: './criar-execucao.component.html',
  styleUrl: './criar-execucao.component.scss'
})
export class CriarExecucaoComponent {
  @Input() form: IForm;
  loading = false;
  @Input() values;
  @Input() justifications = [];
  @Input() notes = [];
  @Input() readOnly: boolean = false;
  @Input() showNotes: boolean = false;
  @Input() readOnlyNotes: boolean = false;
  @Input() execId: string;

  initialNotes = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.values = this.form.components.map((cp, i) => {

      this.notes[i] = {
        execValueId: this.notes?.[i]?.execValueId,
        value: this.notes?.[i]?.value || '',
        techManager: this.notes?.[i]?.techManager,
        accordingly: this.notes?.[i]?.accordingly
      };

      this.justifications[i] = this.justifications?.[i] || '';

      if (cp.type === FormComponentType.TEXT) {
        return this.values?.[i] || '';
      }
      else if (cp.type === FormComponentType.NUMBER) {
        return this.values?.[i] || 0;
      }
      else if (cp.type === FormComponentType.DATE) {
        return new Date(this.values?.[i] || Date.now());
      }
      else if (cp.type === FormComponentType.CHECKBOX_LIST) {
        return this.values?.[i] ? this.values[i].split(';').map(x => x === 'true') : cp.options.map(() => false);
      }
      else if (cp.type === FormComponentType.RADIO_LIST) {
        return this.values?.[i] || null;
      }
      else if (cp.type === FormComponentType.UPLOAD) {
        return (this.values?.[i] || '').split(';').filter(x => x).map(f => {
          return {
            name: f.split('/').pop(),
            url: f
          }
        })
      }

      return null;
    });

    this.initialNotes = structuredClone(this.notes);
  }

  notesChanged() {
    return !this.notes.every((note, i) => note.value === this.initialNotes[i].value && note.accordingly == this.initialNotes[i].accordingly);
  }

  submit() {
    console.log(this.values);
    this.loading = true;

    this.auth.getLoggedUser().subscribe(defaultErrorHandler(async user => {

      const values = await Promise.all(this.values.map(async (v, i) => {

        if (this.form.components[i].required && (!v || v.length === 0)) {
          this.loading = false;
          Swal.fire('Erro', 'Preencha todos os campos obrigatórios', 'error');
          throw new Error('Preencha todos os campos obrigatórios');
        }

        if (this.form.components[i].insertJustification && !this.justifications[i]) {
          this.loading = false;
          Swal.fire('Erro', 'Justifique todos os campos obrigatórios', 'error');
          throw new Error('Justifique todos os campos obrigatórios');
        }

        if (v instanceof FileList) {
          v = await Promise.all(Array.from(v).map(file => {
            return this.formService.uploadFile(this.form.id, file).toPromise()
            .then(res => res.filename)
          }))
        }

        v = Array.isArray(v) ? v.join(';') : v;

        return {
          formComponentId: this.form.components[i].id,
          justification: this.justifications[i],
          value: v
        }
      }));

      this.formService.execute(this.form.id, user.technician?.id, values).subscribe(defaultErrorHandler((exec) => {
        this.router.navigate(['/cadastro/formularios/ver-execucao', exec.id]);
        this.loading = false;
      }));
    }));
  }

  submitNotes() {
    this.loading = true;
    let pending = this.notes.filter(n => (n.value || '').trim()).length;

    this.notes.forEach(note => {
      if (!(note.value || '').trim()) {
        return;
      }
      this.formService.setNote(this.execId, note.execValueId, (note.value || '').trim(), note.accordingly).subscribe(defaultErrorHandler(() => {
        pending--;
        if (pending === 0) {
          this.loading = false;
          this.router.navigate(['/cadastro/formularios']);
        }
      }));
    });

  }


  download(url, btn: HTMLButtonElement) {
    // download with fetch
    btn.disabled = true;
    this.formService.downloadFile(url)
    .subscribe(defaultErrorHandler(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = url.split('/').pop();
      a.click();
      
      setTimeout(() => {
        btn.disabled = false;
        URL.revokeObjectURL(a.href);
      }, 1000);
    }));
  }

}

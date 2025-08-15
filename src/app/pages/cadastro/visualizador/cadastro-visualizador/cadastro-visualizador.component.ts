import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { IViewer } from 'src/app/core/models/viewer.entity';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { ViewerService } from 'src/app/shared/services/viewer.service';

@Component({
  selector: 'app-cadastro-tecnicos',
  templateUrl: './cadastro-visualizador.component.html',
  styleUrl: './cadastro-visualizador.component.scss'
})
export class CadastroVisualizadorComponent {
  viewerForm: FormGroup;
  isEditMode = false;
  viewerId: string | null = null;
  selectedCostCenter: ICostCenter = null;

  constructor(
    private fb: FormBuilder,
    private viewerService: ViewerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.viewerForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      function: [''],
      document: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    const viewerId = this.route.snapshot.paramMap.get('id');
    if (viewerId) {
      this.isEditMode = true;
      this.viewerId = viewerId;
      this.viewerService.getById(viewerId).subscribe(defaultErrorHandler(viewer => {
        this.viewerForm.patchValue({
            ...viewer,
            email: viewer.user?.email,
        });
        this.viewerForm.get('password').clearValidators();
        this.viewerForm.get('password').updateValueAndValidity();
        this.selectedCostCenter = viewer.costCenter;
      }));
    }
  }

  onSubmit(): void {
    if (this.viewerForm.invalid) {
      return;
    }

    const viewer: IViewer = this.viewerForm.value;
    viewer.costCenterId = this.selectedCostCenter.id;
    viewer.costCenter = this.selectedCostCenter;

    if (this.isEditMode) {
      viewer.id = this.viewerId!;
      this.viewerService.update(viewer).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Técnico atualizado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/visualizador']);
      }));
    } else {
      this.viewerService.create(viewer).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Técnico criado com sucesso', 'Fechar', {
        //   duration: 3000
        // });
        this.router.navigate(['/cadastro/visualizador']);
      }));
    }
  }
}

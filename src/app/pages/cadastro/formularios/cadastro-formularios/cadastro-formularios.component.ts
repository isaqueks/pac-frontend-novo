import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { IFormComponent, FormComponentType } from 'src/app/core/models/form-component.entity';
import { IForm } from 'src/app/core/models/form.entity';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-cadastro-formularios',
  templateUrl: './cadastro-formularios.component.html',
  styleUrl: './cadastro-formularios.component.scss'
})
export class CadastroFormulariosComponent {
  form: IForm = {
    id: '',
    title: 'Novo Formulário',
    costCenterId: '',
    costCenter: null,
    components: []
  };
  formComponents: IFormComponent[] = [];
  formComponentTypes = {
    'Número': FormComponentType.NUMBER,
    'Texto': FormComponentType.TEXT,
    'Lista de Checkbox': FormComponentType.CHECKBOX_LIST,
    'Lista de Rádio': FormComponentType.RADIO_LIST,
    'Data': FormComponentType.DATE,
    'Upload': FormComponentType.UPLOAD
  }
  selectedCostCenter: ICostCenter = null;
  isEditMode = false;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const formId = this.route.snapshot.paramMap.get('id');
    if (formId) {
      this.isEditMode = true;
      this.formService.getById(formId).subscribe(defaultErrorHandler((form: IForm) => {
        this.form = form;
        this.selectedCostCenter = form.costCenter;
        this.formComponents = [...form.components];
      }));
    }
    else {
      this.addFormComponent();
    }
  }

  addFormComponent(): void {
    this.formComponents.push({
      id: '',
      title: 'Nova Questão',
      subtitle: '',
      type: FormComponentType.TEXT,
      options: [],
      required: false,
      insertJustification: false,
      formId: this.form.id,
      form: this.form
    });
  }

  removeFormComponent(index: number): void {
    this.formComponents.splice(index, 1);
  }

  saveForm(): void {
    this.form.costCenterId = this.selectedCostCenter.id;
    this.form.costCenter = this.selectedCostCenter;

    if (this.isEditMode) {
      this.formService.update({ ...this.form, components: this.formComponents }).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Formulário atualizado com sucesso', 'Fechar', { duration: 3000 });
        this.router.navigate(['/cadastro/formularios']);
      }));
    } else {
      this.formService.create({ ...this.form, components: this.formComponents }).subscribe(defaultErrorHandler(() => {
        // this.snackBar.open('Formulário criado com sucesso', 'Fechar', { duration: 3000 });
        this.router.navigate(['/cadastro/formularios']);
      }));
    }
  }

  addOption(formComponent: IFormComponent): void {
    formComponent.options.push('');
  }

  removeOption(formComponent: IFormComponent, index: number): void {
    formComponent.options.splice(index, 1);
  }

  isDefaultOption(component: IFormComponent, j: number) {
    // if (![FormComponentType.CHECKBOX_LIST, FormComponentType.RADIO_LIST].includes(component.type)) {
    //   return false;
    // }

    if (component.type === FormComponentType.CHECKBOX_LIST) {
      return component.checkboxListTrueValueIndex === j;
    }
    if (component.type === FormComponentType.RADIO_LIST) {
      return component.radioListTrueValue === component.options[j];
    }

    return false;
  }

  setDefaultOption(component: IFormComponent, j: number) {
    if (component.type === FormComponentType.CHECKBOX_LIST) {
      component.checkboxListTrueValueIndex = j;
    }
    if (component.type === FormComponentType.RADIO_LIST) {
      component.radioListTrueValue = component.options[j];
    }
  }
}

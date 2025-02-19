import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { IFormExecution } from 'src/app/core/models/execution.entity';
import { FormComponentType, IFormComponent } from 'src/app/core/models/form-component.entity';
import { IForm } from 'src/app/core/models/form.entity';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-listagem-execucoes',
  templateUrl: './listagem-execucoes.component.html',
  styleUrl: './listagem-execucoes.component.scss'
})
export class ListagemExecucoesComponent {
  @Input() form: IForm;

  breadCrumbItems = [
    { label: 'Cadastro' },
    { label: 'Formulários' },
    { label: 'Respostas', active: true }
  ];

  // Table data
  griddata: any;

  search: string;

  page: number = 1;
  pageSize: number;
  total: number;

  items: IFormExecution[] = [];

  loading: boolean = true;
  showValues: boolean = true;

  constructor(
    private modalService: NgbModal,
    public service: FormService,
    private sortService: PaginationService,
    private router: Router
  ) {

  }

  getExecutionValue(component: IFormComponent, exec: IFormExecution) {
    return exec.executionValues.find(v => v.formComponentId === component.id);
  }

  getExecutionDisplay(component: IFormComponent, exec: IFormExecution): string {
    const execVal = exec.executionValues.find(v => v.formComponentId === component.id);
    const value = execVal.value;
    if (!value) {
      return '';
    }

    if (component.type === FormComponentType.CHECKBOX_LIST) {
      const trueValues = value.split(';').map(x => x === 'true');
      return component.options.filter((_, i) => trueValues[i]).join(', ');
    }

    return value;
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.loading = true;
    this.service.getExecutions(this.form.id).subscribe((items: IFormExecution[]) => {
      this.items = items;

      this.pageSize = items.length;
      this.total = items.length;
      this.loading = false;
    });
  }

  viewExecution(execution) {
    this.router.navigate(['/cadastro/formularios/ver-execucao/', execution.id]);
  }

  delete(id: string): void {
    this.loading = true;
    this.service.deleteExecution(id).subscribe(() => {
      this.fetchData();
    });
  }


}

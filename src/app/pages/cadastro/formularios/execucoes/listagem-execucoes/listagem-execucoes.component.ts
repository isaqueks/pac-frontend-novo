import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { IFormExecution } from 'src/app/core/models/execution.entity';
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

  constructor(
    private modalService: NgbModal,
    public service: FormService,
    private sortService: PaginationService,
    private router: Router
  ) {

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
    this.router.navigate(['/form/view-execution/', execution.id]);
  }

  delete(id: string): void {
      this.loading = true;
      this.service.deleteExecution(id).subscribe(() => {
          this.fetchData();
      });
  }


}

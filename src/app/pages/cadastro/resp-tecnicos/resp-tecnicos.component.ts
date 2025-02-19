import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { ITechnicalManager } from 'src/app/core/models/technical-maneger.entity';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { TechnicianManagerService } from 'src/app/shared/services/technician-manager.service';

@Component({
  selector: 'app-resp-tecnicos',
  templateUrl: './resp-tecnicos.component.html',
  styleUrl: './resp-tecnicos.component.scss'
})
export class RespTecnicosComponent {
  // bread crumb items
  breadCrumbItems = [
    { label: 'Cadastro' },
    { label: 'Responsáveis Técnicos', active: true }
  ];

  // Table data
  griddata: any;

  selectedCostCenterId: string | null = null;

  search: string;

  page: number = 1;
  pageSize: number;
  total: number;

  items: ITechnicalManager[] = [];

  loading: boolean = true;

  constructor(
    private modalService: NgbModal,
    public service: TechnicianManagerService,
    private sortService: PaginationService,
  ) {

  }

  ngOnInit(): void {
  }

  fetchData(selectedCostCenterId: string): void {
    this.selectedCostCenterId = selectedCostCenterId;
    this.loading = true;
    this.service.getAllByCostCenter(selectedCostCenterId).subscribe(defaultErrorHandler((items: ITechnicalManager[]) => {
      this.items = items;

      this.pageSize = items.length;
      this.total = items.length;
      this.loading = false;
    }));
  }

  onCostCenterChange(cc: ICostCenter): void {
    if (cc) {
      this.fetchData(cc.id);
    } else {
      this.items = [];
    }
  }


  delete(id: string): void {
    this.loading = true;
    this.service.delete(id).subscribe(defaultErrorHandler(() => {
      this.fetchData(this.selectedCostCenterId);
    }));
  }
}

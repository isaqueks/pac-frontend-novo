import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IClient } from 'src/app/core/models/client.entity';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { ITechnician } from 'src/app/core/models/techician.entity';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { TechnicianService } from 'src/app/shared/services/technician.service';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrl: './tecnicos.component.scss'
})
export class TecnicosComponent {
  // bread crumb items
  breadCrumbItems = [
    { label: 'Cadastro' },
    { label: 'Técnicos', active: true }
  ];

  // Table data
  griddata: any;

  selectedCostCenterId: string | null = null;

  search: string;

  page: number = 1;
  pageSize: number;
  total: number;

  items: ITechnician[] = [];

  loading: boolean = true;

  constructor(
    private modalService: NgbModal,
    public service: TechnicianService,
    private sortService: PaginationService,
  ) {

  }

  ngOnInit(): void {
  }

  fetchData(selectedCostCenterId: string): void {
    this.selectedCostCenterId = selectedCostCenterId;
    this.loading = true;
    this.service.getAllByCostCenter(selectedCostCenterId).subscribe((items: ITechnician[]) => {
      this.items = items;

      this.pageSize = items.length;
      this.total = items.length;
      this.loading = false;
    });
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
    this.service.delete(id).subscribe(() => {
      this.fetchData(this.selectedCostCenterId);
    });
  }
}

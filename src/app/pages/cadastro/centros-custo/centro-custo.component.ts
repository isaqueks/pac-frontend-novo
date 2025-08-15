import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IClient } from 'src/app/core/models/client.entity';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { IUser } from 'src/app/core/models/user.entity';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { CostCenterService } from 'src/app/shared/services/cost-center.service';

@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html',
  styleUrl: './centro-custo.component.scss'
})
export class CentroCustoComponent {
// bread crumb items
breadCrumbItems = [
  { label: 'Cadastro' },
  { label: 'Clientes', active: true }
];

// Table data
griddata: any;

selectedClientId: string | null = null;

search: string;

page: number = 1;
pageSize: number;
total: number;

items: ICostCenter[] = [];

loading: boolean = true;

currentUser: IUser;

constructor(
  private modalService: NgbModal,
  public service: CostCenterService, 
  private sortService: PaginationService,
  private auth: AuthenticationService
) {

}

ngOnInit(): void {
  this.auth.getLoggedUser().subscribe(user => {
    this.currentUser = user;
  });
}

carregarCentrosDeCusto(clientId: string): void {
  this.loading = true;
  this.service.getByClientId(clientId).subscribe((costCenters: ICostCenter[]) => {
    this.items = costCenters;

    this.pageSize = costCenters.length;
    this.total = costCenters.length;
    this.loading = false;
  });
}

onClientChange(client: IClient): void {
  if (client) {
    this.carregarCentrosDeCusto(client.id);
  } else {
    this.items = [];
  }
}


delete(ccId: string): void {
  this.loading = true;
  this.service.delete(ccId).subscribe(() => {
    this.carregarCentrosDeCusto(this.selectedClientId);
  });
}

}

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IClient } from 'src/app/core/models/client.entity';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { ITechnician } from 'src/app/core/models/techician.entity';
import { IUser } from 'src/app/core/models/user.entity';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ViewerService } from 'src/app/shared/services/viewer.service';

@Component({
  selector: 'app-visualizador',
  templateUrl: './visualizador.component.html',
  styleUrl: './visualizador.component.scss'
})
export class VisualizadorComponent {
  // bread crumb items
  breadCrumbItems = [
    { label: 'Cadastro' },
    { label: 'CIDASC', active: true }
  ];

  // Table data
  griddata: any;

  search: string;

  page: number = 1;
  pageSize: number;
  total: number;

  items: ITechnician[] = [];

  loading: boolean = true;

  currentUser: IUser;

  constructor(
    private modalService: NgbModal,
    public service: ViewerService,
    private sortService: PaginationService,
    private auth: AuthenticationService
  ) {

  }

  ngOnInit(): void {
    this.auth.getLoggedUser().subscribe(user => {
      this.currentUser = user;
      this.fetchData();
    });
  }

  fetchData(): void {
    this.loading = true;
    this.service.getAll().subscribe((items: ITechnician[]) => {
      this.items = items;

      this.pageSize = items.length;
      this.total = items.length;
      this.loading = false;
    });
  }


  delete(id: string): void {
    this.loading = true;
    this.service.delete(id).subscribe(() => {
      this.fetchData();
    });
  }
}

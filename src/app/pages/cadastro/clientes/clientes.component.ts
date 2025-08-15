import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable, pipe} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { PaginationService } from 'src/app/core/services/pagination.service';
import { IClient } from 'src/app/core/models/client.entity';
import { ClientService } from 'src/app/shared/services/client.service';
import { map } from 'lodash';
import { IUser } from 'src/app/core/models/user.entity';
import { AuthenticationService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [DecimalPipe]
})

/**
 * Gridjs Table Component
 */
export class ClientesComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Table data
  griddata: any;

  search: string;

  page: number = 1;
  pageSize: number;
  total: number;

  items: IClient[] = [];

  loading: boolean = true;

  currentUser: IUser;

  constructor(
    private modalService: NgbModal,
    public service: ClientService, 
    private sortService: PaginationService,
    private auth: AuthenticationService,
  ) {
    this.fetchItems();
  }

  fetchItems() {
    this.loading = true;
    this.service.getAll().subscribe((clients: IClient[]) => {
      this.items = clients;

      this.pageSize = clients.length;
      this.total = clients.length;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Cadastro' },
      { label: 'Clientes', active: true }
    ];

    this.auth.getLoggedUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  // Sort Data
  onSort(column: any) {
    this.griddata= this.sortService.onSort(column, this.griddata)
  }

  deleteClient(clientId: string): void {
    this.loading = true;
    this.service.delete(clientId).subscribe(() => {
      this.fetchItems();
    });
  }

}

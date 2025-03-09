import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { IForm } from 'src/app/core/models/form.entity';
import { IUser } from 'src/app/core/models/user.entity';
import { UserRoleEnum } from 'src/app/core/models/user.role';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.scss'
})
export class FormulariosComponent {
  // bread crumb items
  breadCrumbItems = [
    { label: 'Cadastro' },
    { label: 'Formulários', active: true }
  ];

  // Table data
  griddata: any;

  selectedCostCenterId: string | null = null;

  search: string;

  page: number = 1;
  pageSize: number;
  total: number;

  items: IForm[] = [];

  user: IUser;

  roles = UserRoleEnum;

  loading: boolean = true;

  constructor(
    private modalService: NgbModal,
    public service: FormService,
    private sortService: PaginationService,
    private auth: AuthenticationService
  ) {
    this.auth.getLoggedUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  fetchData(selectedCostCenterId: string): void {
    this.selectedCostCenterId = selectedCostCenterId;
    this.loading = true;
    this.service.getByCostCenter(selectedCostCenterId).subscribe((items: IForm[]) => {
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

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IClient } from 'src/app/core/models/client.entity';
import { ICostCenter } from 'src/app/core/models/cost-center.entity';
import { UserRoleEnum } from 'src/app/core/models/user.role';
import { defaultErrorHandler } from '../../default-error-handler';
import { ClientService } from '../../services/client.service';
import { CostCenterService } from '../../services/cost-center.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'cost-center-select',
  templateUrl: './cost-center-select.component.html',
  styleUrl: './cost-center-select.component.scss'
})
export class CostCenterSelectComponent {
  @Output() valueChange: EventEmitter<ICostCenter> = new EventEmitter<ICostCenter>();
  @Input() value: ICostCenter;
  @Input() label: string = 'Selecionar Setor';
  @Input() readOnly: boolean = false;

  clientSelectDisabled: boolean = false;

  clients: IClient[] = [];
  costCenters: ICostCenter[] = [];

  selectedClient: IClient;
  loading = true;

  constructor(
    private costCenterService: CostCenterService,
    private clientService: ClientService,
    private auth: AuthenticationService
  ) {}

  selectClient(ev) {
    const clientId = ev.target.value;
    const client = this.clients.find(client => client.id === clientId);
    this.selectedClient = client;
    console.log(this.selectedClient)
    this.loadCostCenters(clientId);
  }

  selectCostCenter(ev) {
    const id = ev.target.value;
    const costCenter = this.costCenters.find(center => center.id === id);
    this.valueChange.emit(costCenter);
    this.value = costCenter;
  }

  loadCostCenters(clientId: string): void {
      this.loading = true;
    this.costCenterService.getByClientId(clientId).subscribe(costCenters => {
      this.costCenters = costCenters;
      if (costCenters.length > 0) {
        this.selectCostCenter({ target: { value: costCenters[0].id } });
      }
      else {
        this.selectCostCenter({ target: { value: null } });
      }
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.auth.getLoggedUser().subscribe(user => {
      if (!user) {
        this.loading = false;
        return;
      }

      if (user.role === UserRoleEnum.ADMIN) {
        this.clientService.getAll().subscribe(clients => {
          this.clients = clients;
          if (clients.length > 0) {
            this.selectClient({ target: { value: clients[0].id } });
          }
          this.loading = false;
        });
      }
      else if (user.role === UserRoleEnum.CLIENT) {
        this.clientSelectDisabled = true;
        const { client } = user;
        this.clients = [client];
        this.selectedClient = client;
        this.loadCostCenters(client.id);
        this.loading = false;
      }
      else if (user.role === UserRoleEnum.COST_CENTER) {
        this.readOnly = true;
        this.costCenterService.getById(user.costCenter.id).subscribe(defaultErrorHandler(costCenter => {
          this.clients = [costCenter.client];
          this.costCenters = [costCenter];
          this.selectCostCenter({ target: { value: costCenter.id } });
          this.loading = false;
        }));
      }
      else if (user.role === UserRoleEnum.TECHNICIAN) {
        this.readOnly = true;
          this.costCenterService.getById(user.technician.costCenterId).subscribe(defaultErrorHandler(costCenter => {
              this.clients = [costCenter.client];
              this.costCenters = [costCenter];
              this.selectCostCenter({ target: { value: costCenter.id } });
              this.loading = false;
          }));
      }
      else if (user.role === UserRoleEnum.TECHNICAL_MANAGER) {
        this.readOnly = true;
          this.costCenterService.getById(user.technicalManager.costCenterId).subscribe(defaultErrorHandler(costCenter => {
              this.clients = [costCenter.client];
              this.costCenters = [costCenter];
              this.selectCostCenter({ target: { value: costCenter.id } });
              this.loading = false;
          }));
      }
      else {
        this.loading = false;
      }
    });
  }
}

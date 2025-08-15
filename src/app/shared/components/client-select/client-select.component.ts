import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClient } from 'src/app/core/models/client.entity';
import { UserRoleEnum } from 'src/app/core/models/user.role';
import { ClientService } from '../../services/client.service';
import { CostCenterService } from '../../services/cost-center.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.scss']
})
export class ClientSelectComponent implements OnInit {

    @Output() valueChange: EventEmitter<IClient> = new EventEmitter<IClient>();
    @Input() value: IClient;
    @Input() label: string = 'Cliente';
    @Input() readOnly: boolean = false;

    clients: IClient[] = [];

    loading = true;

    constructor(
        private clientService: ClientService,
        private cc: CostCenterService,
        private auth: AuthenticationService
    ) {}

    selectClient(ev) {
        const id = ev.target.value;
        const client = this.clients.find(client => client.id === id);
        this.valueChange.emit(client);
        this.value = client;
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
                    this.loading = false
                });
            }
            else if (user.role === UserRoleEnum.CLIENT) {
                const { client } = user;
                this.clients = [client];
                this.selectClient({ target: { value: client.id } });
                this.loading = false;
                this.readOnly = true;
            }
            else if (user.role === UserRoleEnum.COST_CENTER) {
                this.cc.getById(user.costCenter.clientId).subscribe(costCenter => {
                    const { client } = costCenter;
                    this.clients = [client];
                    this.selectClient({ target: { value: client.id } });
                    this.loading = false;
                    this.readOnly = true;
                });
            }
            else if (user.role === UserRoleEnum.VIEWER) {
                this.cc.getById(user.viewer.costCenterId).subscribe(costCenter => {
                    const { client } = costCenter;
                    this.clients = [client];
                    this.selectClient({ target: { value: client.id } });
                    this.loading = false;
                    this.readOnly = true;
                });
            }
            else {
                this.loading = false;
            }
        })
    }

}

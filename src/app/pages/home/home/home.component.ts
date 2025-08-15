import { Component } from '@angular/core';
import { IUser } from 'src/app/core/models/user.entity';
import { UserRoleEnum } from 'src/app/core/models/user.role';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  user: IUser;

  constructor(
    private auth: AuthenticationService
) {
    this.auth.getLoggedUser().subscribe((user: IUser) => {
        this.user = user;
    });
}

getUserRoleLabel(role: UserRoleEnum) {
    switch (role) {
        case 'ADMIN':
            return 'Administrador';
        case 'COST_CENTER':
            return 'Centro de Custo';
        case 'TECHNICIAN':
            return 'Técnico';
        case 'CLIENT':
            return 'Empresa';
        case 'TECHNICAL_MANAGER':
            return 'Responsável Técnico';
        case 'VIEWER':
            return 'CIDASC';
    }
    return role;
}
}

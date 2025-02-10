import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IForm } from 'src/app/core/models/form.entity';
import { IUser } from 'src/app/core/models/user.entity';
import { UserRoleEnum } from 'src/app/core/models/user.role';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-execucoes',
  templateUrl: './execucoes.component.html',
  styleUrl: './execucoes.component.scss'
})
export class ExecucoesComponent {
  form: IForm;
  loading = true;
  user: IUser;

  roles = UserRoleEnum;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const formId = this.route.snapshot.paramMap.get('formId');
    this.formService.getById(formId).subscribe(form => {
      this.form = form;
      this.auth.getLoggedUser().subscribe(user => {
        this.user = user;
        this.loading = false;
      });
    });
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormExecution } from 'src/app/core/models/execution.entity';
import { IForm } from 'src/app/core/models/form.entity';
import { IUser } from 'src/app/core/models/user.entity';
import { UserRoleEnum } from 'src/app/core/models/user.role';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-ver-execucao',
  templateUrl: './ver-execucao.component.html',
  styleUrl: './ver-execucao.component.scss'
})
export class VerExecucaoComponent {

  form: IForm;

  loading = true;

  values = null;

  execution: IFormExecution;

  user: IUser;
  roles = UserRoleEnum;
  notes = [];
  justifications = [];

  constructor(
      private formService: FormService,
      private route: ActivatedRoute,
      private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('execId');
      this.loading = true;
      this.formService.getExecutionById(id).subscribe(defaultErrorHandler(formExecution => {
          this.execution = formExecution;
          this.justifications = formExecution.executionValues.map(ev => ev.justification);
          this.notes = formExecution.executionValues.map(ev => {
              console.log(ev)
              return {
                  execValueId: ev.id,
                  techManager: ev.technicalManager,
                  value: ev.note,
                  accordingly: ev.accordingly,
                  componentId: ev.formComponentId,
              };
          });
          console.log(this.notes)
          this.formService.getById(formExecution?.formId).subscribe(defaultErrorHandler(form => {
              this.form = form;
              this.values = this.form.components.map(cp => {
                  return formExecution.executionValues.find(v => v.formComponentId === cp.id)?.value;
              });
              this.auth.getLoggedUser().subscribe(defaultErrorHandler(user => {
                  this.user = user;
                  this.loading = false;
              }));
          }));

      }));
  }
}

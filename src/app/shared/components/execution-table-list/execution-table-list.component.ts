import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IFormExecution } from 'src/app/core/models/execution.entity';
import { IFormComponent, FormComponentType } from 'src/app/core/models/form-component.entity';
import { IForm } from 'src/app/core/models/form.entity';
import { FormService } from '../../services/form.service';
import { defaultErrorHandler } from '../../default-error-handler';
import { IUser } from 'src/app/core/models/user.entity';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-execution-table-list',
  templateUrl: './execution-table-list.component.html',
  styleUrl: './execution-table-list.component.scss'
})
export class ExecutionTableListComponent {
  @Input() items: IFormExecution[] = [];
  @Input() form: IForm;

  @Input() showValues: boolean = true;

  @Input() deleteAllowed: boolean = true;
  @Output() onDelete = new EventEmitter<string>();

  currentUser: IUser;

  constructor(
    private router: Router,
    private service: FormService,
    private auth: AuthenticationService
  ) {
    this.auth.getLoggedUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  getExecutionValue(component: IFormComponent, exec: IFormExecution) {
    return exec.executionValues.find(v => v.formComponentId === component.id);
  }

  getExecutionDisplay(component: IFormComponent, exec: IFormExecution): string {
    const execVal = exec.executionValues.find(v => v.formComponentId === component.id);
    const value = execVal.value;
    if (!value) {
      return '';
    }

    if (component.type === FormComponentType.CHECKBOX_LIST) {
      const trueValues = value.split(';').map(x => x === 'true');
      return component.options.filter((_, i) => trueValues[i]).join(', ');
    }

    return value;
  }

  viewExecution(execution) {
    this.router.navigate(['/cadastro/formularios/ver-execucao/', execution.id]);
  }

  delete(id: string): void {
    this.onDelete.emit(id);
  }

  download(url, btn: HTMLButtonElement) {
      // download with fetch
      btn.disabled = true;
      this.service.downloadFile(url)
      .subscribe(defaultErrorHandler(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = url.split('/').pop();
        a.click();
        
        setTimeout(() => {
          btn.disabled = false;
          URL.revokeObjectURL(a.href);
        }, 1000);
      }));
    }
}

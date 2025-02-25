import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';

const routes: Routes = [
  {
    path: 'monitoramento',
    component: MonitoramentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }

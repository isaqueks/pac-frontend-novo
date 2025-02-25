import { Component } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';

@Component({
  selector: 'app-monitoramento',
  templateUrl: './monitoramento.component.html',
  styleUrl: './monitoramento.component.scss'
})
export class MonitoramentoComponent {

  breadCrumbItems = [
    { label: 'Relatórios' },
    { label: 'Monitoramento', active: true }
  ];

  constructor(
    private reportService: ReportService
  ) {}

}

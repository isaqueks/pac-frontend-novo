import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/core/models/client.entity';
import { IReportByClient } from 'src/app/core/models/report-by-cost-center.entity';
import { defaultErrorHandler } from 'src/app/shared/default-error-handler';
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

  loading: boolean = false;
  reportData: IReportByClient[];
  selectedClientId: string;

  constructor(
    private reportService: ReportService
  ) {}

  fetchReportData() {
    this.loading = true;
    this.reportService
      .getExecutionsNotAccordinglyByClient(this.selectedClientId)
      .subscribe(defaultErrorHandler(data => {
        this.reportData = data;
        this.loading = false;
      }));
  }

  onClientChange(client: IClient) {
    this.selectedClientId = client.id;
    this.fetchReportData();
  }

  getInconformityCount(item: IReportByClient) {
    return item.forms.reduce((acc, form) => {
      return acc + form.executions.length;
    }, 0);
  }
}

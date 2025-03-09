import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { IClient } from 'src/app/core/models/client.entity';
import { IForm } from 'src/app/core/models/form.entity';
import { IFormReport, IReportByClient } from 'src/app/core/models/report-by-cost-center.entity';
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

  loading: boolean = true;
  reportData: WritableSignal<IReportByClient[]> = signal(null);
  viewMode: 'client' | 'sector' | 'form' = 'client';
  
  currClient: IClient;

  selectedClientId: WritableSignal<string> = signal(null);
  selectedSectorId: WritableSignal<string> = signal(null);
  selectedFormId: WritableSignal<string> = signal(null);

  selectedSector: Signal<IReportByClient> = computed(() => {
    return this.reportData() && this.reportData().find(sector => sector.id === this.selectedSectorId());
  });

  selectedForm: Signal<IFormReport> = computed(() => {
    return this.selectedSector() && this.selectedSector().forms.find(form => form.id === this.selectedFormId());
  });

  constructor(
    private reportService: ReportService
  ) {}

  selectClient(client: IClient) {
    this.currClient = client;
    this.selectedClientId.set(client.id);
    this.viewMode = 'client';
  }

  selectCostCenter(costCenter: IReportByClient) {
    this.selectedSectorId.set(costCenter.id);
    this.viewMode = 'sector';
  }

  selectForm(form: IFormReport) {
    this.selectedFormId.set(form.id);
    this.viewMode = 'form';
  }

  fetchReportData() {
    this.loading = true;
    this.reportService
      .getExecutionsNotAccordinglyByClient(this.selectedClientId())
      .subscribe(defaultErrorHandler(data => {
        this.reportData.set(data);
        this.loading = false;
      }));
  }

  onClientChange(client: IClient) {
    this.selectClient(client);
    this.selectedSectorId.set(null);
    this.selectedFormId.set(null);
    this.fetchReportData();
  }

  getInconformityCount(item: IReportByClient) {
    return item.forms.reduce((acc, form) => {
      return acc + form.executions.length;
    }, 0);
  }
}

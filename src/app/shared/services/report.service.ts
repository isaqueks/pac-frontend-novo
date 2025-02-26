import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IReportByClient } from 'src/app/core/models/report-by-cost-center.entity';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  getExecutionsNotAccordinglyByClient(costCenterId: string): Observable<IReportByClient[]> {
    return this.http.get<IReportByClient[]>(`/reports/cost-centers-with-executions?clientId=${costCenterId}`);
  }

}

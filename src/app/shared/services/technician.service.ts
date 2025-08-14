import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnician } from 'src/app/core/models/techician.entity';

@Injectable({
    providedIn: 'root'
})
export class TechnicianService implements IEntityService<ITechnician> {

    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<ITechnician[]> {
        return this.http.get<ITechnician[]>('/technicians');
    }

    getAllByCostCenter(ccID: string): Observable<ITechnician[]> {
        return this.http.get<ITechnician[]>(`/technicians?costCenterId=${ccID}`);
    }

    getById(id: string): Observable<ITechnician> {
        return this.http.get<ITechnician>(`/technicians/${id}`);
    }

    create(entity: ITechnician): Observable<ITechnician> {
        return this.http.post<ITechnician>('/technicians', entity);
    }

    update(entity: ITechnician & { password?: string }): Observable<ITechnician> {
        return this.http.put<ITechnician>(`/technicians/${entity.id}`, {
            ...entity,
            password: entity.password || undefined
        });
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/technicians/${id}`);
    }
}

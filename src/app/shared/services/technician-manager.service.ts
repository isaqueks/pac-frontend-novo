import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITechnicalManager } from 'src/app/core/models/technical-maneger.entity';

@Injectable({
    providedIn: 'root'
})
export class TechnicianManagerService implements IEntityService<ITechnicalManager> {

    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<ITechnicalManager[]> {
        return this.http.get<ITechnicalManager[]>('/technical-managers');
    }

    getById(id: string): Observable<ITechnicalManager> {
        return this.http.get<ITechnicalManager>(`/technical-managers/${id}`);
    }

    getAllByCostCenter(ccID: string): Observable<ITechnicalManager[]> {
        return this.http.get<ITechnicalManager[]>(`/technical-managers?costCenterId=${ccID}`);
    }

    create(entity: ITechnicalManager): Observable<ITechnicalManager> {
        return this.http.post<ITechnicalManager>('/technical-managers', entity);
    }

    update(entity: ITechnicalManager & { password?: string }): Observable<ITechnicalManager> {
        return this.http.put<ITechnicalManager>(`/technical-managers/${entity.id}`, {
            ...entity,
            password: entity.password || undefined
        });
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/technical-managers/${id}`);
    }
}

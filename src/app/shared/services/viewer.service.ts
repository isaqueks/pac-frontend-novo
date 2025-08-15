import { Injectable } from '@angular/core';
import IEntityService from './entity-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IViewer } from 'src/app/core/models/viewer.entity';

@Injectable({
    providedIn: 'root'
})
export class ViewerService implements IEntityService<IViewer> {

    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<IViewer[]> {
        return this.http.get<IViewer[]>('/viewers');
    }

    getAllByCostCenter(ccID: string): Observable<IViewer[]> {
        return this.http.get<IViewer[]>(`/viewers?costCenterId=${ccID}`);
    }

    getById(id: string): Observable<IViewer> {
        return this.http.get<IViewer>(`/viewers/${id}`);
    }

    create(entity: IViewer): Observable<IViewer> {
        return this.http.post<IViewer>('/viewers', entity);
    }

    update(entity: IViewer & { password?: string }): Observable<IViewer> {
        return this.http.put<IViewer>(`/viewers/${entity.id}`, {
            ...entity,
            password: entity.password || undefined
        });
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`/viewers/${id}`);
    }
}

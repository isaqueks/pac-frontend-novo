import { Observable } from "rxjs";
import { IBaseEntity } from "src/app/core/models/base.entity";

export default interface IEntityService<T extends IBaseEntity> {
    getAll(): Observable<T[]>;
    getById(id: string): Observable<T>;
    create(entity: T): Observable<T>;
    update(entity: T): Observable<T>;
    delete(id: string): Observable<void>;
}
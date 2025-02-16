import { IBaseEntity } from "./base.entity";
import { ITechnician } from "./techician.entity";
import { ITechnicalManager } from "./technical-maneger.entity";


export interface IFormExecution extends IBaseEntity {

    accordingly: boolean;
    technicianId: string; 
    technician?: ITechnician;
    formId: string;
    executionValues: Array<{
        accordingly: boolean;
        formComponentId: string; 
        justification?: string;
        technicalManager?: ITechnicalManager;
        id: string;
        note: string;
        value: string;
    }>;

}
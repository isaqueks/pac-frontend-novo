import { IBaseEntity } from "./base.entity";
import { IClient } from "./client.entity";
import { ICostCenter } from "./cost-center.entity";
import { ITechnician } from "./techician.entity";
import { ITechnicalManager } from "./technical-maneger.entity";
import { UserRoleEnum } from "./user.role";
import { IViewer } from "./viewer.entity";

export interface IUser extends IBaseEntity {
    email: string;
    password: string;
    role: UserRoleEnum;

    client?: IClient;
    costCenter?: ICostCenter;
    technician?: ITechnician;
    viewer?: IViewer;
    technicalManager?: ITechnicalManager;
  }
  
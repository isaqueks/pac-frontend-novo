import { ICostCenter } from "./cost-center.entity";
import { IFormExecution } from "./execution.entity";
import { IForm } from "./form.entity";


export type IReportByClient = Array<ICostCenter & {
  forms: Array<IForm & {
    executions: (IFormExecution & { accordingly: false })[];
  }>
}>;
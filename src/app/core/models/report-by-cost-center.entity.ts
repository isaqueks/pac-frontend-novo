import { ICostCenter } from "./cost-center.entity";
import { IFormExecution } from "./execution.entity";
import { IForm } from "./form.entity";

export type IFormReport = IForm & {
  executions: (IFormExecution & { accordingly: false })[];
};

export type IReportByClient = ICostCenter & {
  forms: Array<IFormReport>
};
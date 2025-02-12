import { UserRoleEnum } from "src/app/core/models/user.role";

export interface MenuItem {
  id?: number;
  label?: any;
  icon?: string;
  link?: string;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  isLayout?: boolean;
  isCollapsed?: any;

  perms?: UserRoleEnum[];
}
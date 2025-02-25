import { UserRoleEnum } from 'src/app/core/models/user.role';
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    // id: 1,
    label: 'Início',
    icon: 'ri-home-line',
    // link: '/auth/signin/basic',
    // isCollapsed: true,
    subItems: [
      {
        label: 'Dashboard',
        link: '/',
      },
      {
        label: 'Monitoramento',
        link: '/relatorios/monitoramento',
      },
    ],
    isCollapsed: false
  },
  {
    // id: 1,
    label: 'Cadastro',
    icon: 'ri-survey-line',
    isCollapsed: true,
    subItems: [
      {
        label: 'Clientes',
        link: '/cadastro/clientes',
        perms: [UserRoleEnum.ADMIN]
      },
      {
        label: 'Setores',
        link: '/cadastro/setores',
        perms: [UserRoleEnum.ADMIN, UserRoleEnum.CLIENT]
      },
      {
        label: 'Técnicos',
        link: '/cadastro/tecnicos',
        perms: [UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER, UserRoleEnum.CLIENT]
      },
      {
        label: 'Responsáveis Técnicos',
        link: '/cadastro/responsaveis-tecnicos',
        perms: [UserRoleEnum.ADMIN, UserRoleEnum.COST_CENTER, UserRoleEnum.CLIENT]
      },
      {
        label: 'Formulários',
        link: '/cadastro/formularios',
        perms: [
          UserRoleEnum.ADMIN, 
          UserRoleEnum.COST_CENTER, 
          UserRoleEnum.CLIENT, 
          UserRoleEnum.TECHNICIAN, 
          UserRoleEnum.TECHNICAL_MANAGER
        ]
      },
    ]
    // isTitle: true
  },
 

];

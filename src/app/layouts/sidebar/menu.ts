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
      },
      {
        label: 'Setores',
        link: '/cadastro/setores',
      },
      {
        label: 'Técnicos',
        link: '/cadastro/tecnicos',
      },
      {
        label: 'Responsáveis Técnicos',
        link: '/cadastro/responsaveis-tecnicos',
      },
      {
        label: 'Formulários',
        link: '/cadastro/formularios',
      },
    ]
    // isTitle: true
  },
 

];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CentroCustoComponent } from './centros-custo/centro-custo.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { RespTecnicosComponent } from './resp-tecnicos/resp-tecnicos.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { CadastroClienteComponent } from './clientes/cadastro-cliente/cadastro-cliente.component';
import { CadastroCentroCustoComponent } from './centros-custo/cadastro-centro-custo/cadastro-centro-custo.component';

const routes: Routes = [
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'clientes/cadastrar',
    component: CadastroClienteComponent
  },
  {
    path: 'clientes/:id',
    component: CadastroClienteComponent
  },
  {
    path: 'setores',
    component: CentroCustoComponent
  },
  {
    path: 'setores/cadastrar',
    component: CadastroCentroCustoComponent
  },
  {
    path: 'setores/:id',
    component: CadastroCentroCustoComponent
  },
  {
    path: 'tecnicos',
    component: TecnicosComponent
  },
  {
    path: 'tecnicos/cadastro/:id',
    component: TecnicosComponent
  },
  {
    path: 'responsaveis-tecnicos',
    component: RespTecnicosComponent
  },
  {
    path: 'responsaveis-tecnicos/cadastro/:id',
    component: RespTecnicosComponent
  },
  {
    path: 'formularios',
    component: FormulariosComponent
  },
  {
    path: 'formularios/cadastro/:id',
    component: FormulariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }

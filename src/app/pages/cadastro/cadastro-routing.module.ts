import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { CentroCustoComponent } from './centros-custo/centro-custo.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { RespTecnicosComponent } from './resp-tecnicos/resp-tecnicos.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { CadastroClienteComponent } from './clientes/cadastro-cliente/cadastro-cliente.component';
import { CadastroCentroCustoComponent } from './centros-custo/cadastro-centro-custo/cadastro-centro-custo.component';
import { CadastroTecnicosComponent } from './tecnicos/cadastro-tecnicos/cadastro-tecnicos.component';
import { CadastroResponsaveisTecnicosComponent } from './resp-tecnicos/cadastro-responsaveis-tecnicos/cadastro-responsaveis-tecnicos.component';
import { CadastroFormulariosComponent } from './formularios/cadastro-formularios/cadastro-formularios.component';
import { ExecucoesComponent } from './formularios/execucoes/execucoes.component';
import { VerExecucaoComponent } from './formularios/execucoes/ver-execucao/ver-execucao.component';
import { VisualizadorComponent } from './visualizador/visualizador.component';
import { CadastroVisualizadorComponent } from './visualizador/cadastro-visualizador/cadastro-visualizador.component';

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
    path: 'tecnicos/cadastrar',
    component: CadastroTecnicosComponent
  },
  {
    path: 'tecnicos/:id',
    component: CadastroTecnicosComponent
  },
  {
    path: 'visualizador',
    component: VisualizadorComponent
  },
  {
    path: 'visualizador/cadastrar',
    component: CadastroVisualizadorComponent
  },
  {
    path: 'visualizador/:id',
    component: CadastroVisualizadorComponent
  },
  {
    path: 'responsaveis-tecnicos',
    component: RespTecnicosComponent
  },
  {
    path: 'responsaveis-tecnicos/cadastrar',
    component: CadastroResponsaveisTecnicosComponent
  },
  {
    path: 'responsaveis-tecnicos/:id',
    component: CadastroResponsaveisTecnicosComponent
  },
  {
    path: 'formularios',
    component: FormulariosComponent
  },
  {
    path: 'formularios/cadastrar',
    component: CadastroFormulariosComponent
  },
  {
    path: 'formularios/execucoes/:formId',
    component: ExecucoesComponent
  },
  {
    path: 'formularios/ver-execucao/:execId',
    component: VerExecucaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }

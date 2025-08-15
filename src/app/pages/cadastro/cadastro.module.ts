import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgPipesModule } from 'ngx-pipes';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ClientesComponent } from './clientes/clientes.component';
import { NgbdListSortableHeader } from 'src/app/shared/listjs-sortable.directive';
import { CadastroClienteComponent } from './clientes/cadastro-cliente/cadastro-cliente.component';
import { CentroCustoComponent } from './centros-custo/centro-custo.component';
import { CadastroCentroCustoComponent } from './centros-custo/cadastro-centro-custo/cadastro-centro-custo.component';
import { TecnicosComponent } from './tecnicos/tecnicos.component';
import { CadastroTecnicosComponent } from './tecnicos/cadastro-tecnicos/cadastro-tecnicos.component';
import { RespTecnicosComponent } from './resp-tecnicos/resp-tecnicos.component';
import { CadastroResponsaveisTecnicosComponent } from './resp-tecnicos/cadastro-responsaveis-tecnicos/cadastro-responsaveis-tecnicos.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { CadastroFormulariosComponent } from './formularios/cadastro-formularios/cadastro-formularios.component';
import { ExecucoesComponent } from './formularios/execucoes/execucoes.component';
import { ListagemExecucoesComponent } from './formularios/execucoes/listagem-execucoes/listagem-execucoes.component';
import { CriarExecucaoComponent } from './formularios/execucoes/criar-execucao/criar-execucao.component';
import { VerExecucaoComponent } from './formularios/execucoes/ver-execucao/ver-execucao.component';
import { VisualizadorComponent } from './visualizador/visualizador.component';
import { CadastroVisualizadorComponent } from './visualizador/cadastro-visualizador/cadastro-visualizador.component';


@NgModule({
  declarations: [
    NgbdListSortableHeader,

    ClientesComponent,
    CadastroClienteComponent,

    CentroCustoComponent,
    CadastroCentroCustoComponent,

    TecnicosComponent,
    CadastroTecnicosComponent,

    RespTecnicosComponent,
    CadastroResponsaveisTecnicosComponent,
    FormulariosComponent,
    CadastroFormulariosComponent,
    ExecucoesComponent,
    ListagemExecucoesComponent,
    CriarExecucaoComponent,
    VerExecucaoComponent,

    VisualizadorComponent,
    CadastroVisualizadorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    FlatpickrModule,
    SharedModule,
    SimplebarAngularModule,
    NgPipesModule,
    CadastroRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CadastroModule { }

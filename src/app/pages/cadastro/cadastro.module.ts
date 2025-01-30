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


@NgModule({
  declarations: [
    NgbdListSortableHeader,
    ClientesComponent,
    CadastroClienteComponent
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

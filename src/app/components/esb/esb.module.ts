import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ApplicationComponent } from './application/application.component';
import { ApplicationsComponent } from './applications/applications.component';

import { UiModule } from '../ui/ui.module';
import { InterfaceComponent } from './interface/interface.component';
import { InterfacesComponent } from './interfaces/interfaces.component';
import { TypeComponent } from './type/type.component';
import { TypesComponent } from './types/types.component';
import { NamespacesComponent } from './namespaces/namespaces.component';
import { ProgramComponent } from './program/program.component';
import { CallComponent } from './call/call.component';

@NgModule({
  declarations: [
    ApplicationComponent,
    ApplicationsComponent,
    InterfaceComponent,
    InterfacesComponent,
    TypeComponent,
    TypesComponent,
    NamespacesComponent,
    ProgramComponent,
    CallComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UiModule
  ],
  exports: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ESBModule { }

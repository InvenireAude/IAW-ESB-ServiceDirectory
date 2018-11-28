import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { RouteTransformerDirective } from './program/routetransform';
import { SystemStatsComponent } from './system-stats/system-stats.component';
import { QueueBrowserComponent } from './queue-browser/queue-browser.component';
import { SystemStatsMemoryComponent } from './system-stats-memory/system-stats-memory.component';
import { SystemStatsMemoryManagerComponent } from './system-stats-memory-manager/system-stats-memory-manager.component';
import { SystemStatsQueuesComponent } from './system-stats-queues/system-stats-queues.component';
import { BrokerStatsComponent } from './broker-stats/broker-stats.component';

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
    CallComponent,
    RouteTransformerDirective,
    SystemStatsComponent,
    QueueBrowserComponent,
    SystemStatsMemoryComponent,
    SystemStatsMemoryManagerComponent,
    SystemStatsQueuesComponent,
    BrokerStatsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UiModule,
    NgbModule
  ],
  exports: [
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ESBModule { }

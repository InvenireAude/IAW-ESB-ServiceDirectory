import { NgModule, ApplicationModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/main/about/about.component';
import { MenuComponent } from './components/main/menu/menu.component';
import { ApplicationsComponent } from './components/esb/applications/applications.component';
import { ApplicationComponent } from './components/esb/application/application.component';
import { TypesComponent } from './components/esb/types/types.component';
import { TypeComponent } from './components/esb/type/type.component';
import { NamespacesComponent } from './components/esb/namespaces/namespaces.component';
import { InterfaceComponent } from './components/esb/interface/interface.component';
import { InterfacesComponent } from './components/esb/interfaces/interfaces.component';
import { ProgramComponent } from './components/esb/program/program.component';
import { CallComponent } from './components/esb/call/call.component';
import { SystemStatsComponent } from './components/esb/system-stats/system-stats.component';
import { QueueBrowserComponent } from './components/esb/queue-browser/queue-browser.component';
import { BrokerStatsComponent } from './components/esb/broker-stats/broker-stats.component';
import { SMStatusComponent } from './components/esb/sm-status/sm-status.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu',    component: MenuComponent  },
  { path: 'applications',    component: ApplicationsComponent  },
  { path: 'application',     component: ApplicationComponent },
  { path: 'types',    component: TypesComponent  },
  { path: 'type',     component: TypeComponent },
  { path: 'interfaces',    component: InterfacesComponent  },
  { path: 'interface',     component: InterfaceComponent  },
  { path: 'namespaces',    component: NamespacesComponent  },
  { path: 'program',       component: ProgramComponent  },
  { path: 'call',       component: CallComponent  },
  { path: 'systemStats',       component: SystemStatsComponent  },
  { path: 'queueBrowser',       component: QueueBrowserComponent  },
  { path: 'brokerStats',        component: BrokerStatsComponent  },
  { path: 'smStatus',           component: SMStatusComponent  },
  { path: 'about',   component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { MenuComponent } from './menu/menu.component';
import { MenuBrickComponent } from './menu-brick/menu-brick.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [
    AboutComponent,
    MenuComponent,
    MenuBrickComponent,
  ],
  imports: [
    CommonModule,
    UiModule,
    RouterModule
  ],
  exports: [
  ]
})
export class MainModule { }

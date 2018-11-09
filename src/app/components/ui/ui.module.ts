import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionGroupComponent } from './accordion-group/accordion-group.component';
import { LoaderComponent } from './loader/loader.component';
import { ObjectTreeComponent } from './object-tree/object-tree.component';

import { KeysPipe } from '../../filters/keys-filter.pipe';
import { KeysNoTypePipe } from '../../filters/keys-notype-filter.pipe';


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    AccordionComponent,
    AccordionGroupComponent,
    LoaderComponent,
    ObjectTreeComponent,
    KeysPipe,
    KeysNoTypePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    AccordionComponent,
    AccordionGroupComponent,
    LoaderComponent,
    ObjectTreeComponent,
    KeysPipe,
    KeysNoTypePipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UiModule { }

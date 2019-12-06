import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { DownloadContentComponent } from './download-content/download-content.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ChartLinesComponent } from './chart-lines/chart-lines.component';
import { ChartBarsComponent } from './chart-bars/chart-bars.component';
import { GeneralTextFilterPipe } from 'src/app/filters/general-text-filter.pipe';
import { GeneralFilterPipe } from 'src/app/filters/general-filter.pipe';
import { ServiceStatusComponent } from './service-status/service-status.component';


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
    KeysNoTypePipe,
    DownloadContentComponent,
    ProgressBarComponent,
    ChartLinesComponent,
    ChartBarsComponent,
    GeneralFilterPipe,
    GeneralTextFilterPipe,
    ServiceStatusComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    AccordionComponent,
    AccordionGroupComponent,
    LoaderComponent,
    ObjectTreeComponent,
    DownloadContentComponent,
    ProgressBarComponent,
    ChartLinesComponent,
    ChartBarsComponent,
    KeysPipe,
    KeysNoTypePipe,
    GeneralFilterPipe,
    GeneralTextFilterPipe,
    ServiceStatusComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UiModule { }

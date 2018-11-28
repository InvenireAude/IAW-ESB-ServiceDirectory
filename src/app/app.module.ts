import 'zone.js';
import 'reflect-metadata';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TypesService } from './services/esb/types.service';
import { LangService } from './services/esb/lang.service';
import { ServiceDirectoryService } from './services/esb/service-directory.service';
import { QSystemService } from './services/esb/qsystem.service';
import { TesterService } from './services/esb/tester.service';
import { HttpService } from './services/http.service';
import { LoaderService } from './services/loader.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './components/ui/ui.module';
import { MainModule } from './components/main/main.module';
import { ESBModule } from './components/esb/esb.module';

import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';



export function backendFactory(backend: XHRBackend, defaultOptions: RequestOptions, loaderService: LoaderService) {
  return new HttpService(backend, defaultOptions, loaderService);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    UiModule,
    MainModule,
    ESBModule
  ],
  providers: [
    TypesService,
    LangService,
    ServiceDirectoryService,
    QSystemService,
    TesterService,
    LoaderService,
     {
          provide: HttpService,
          useFactory: backendFactory,
          deps: [XHRBackend, RequestOptions, LoaderService ]
       },
    DefaultUrlSerializer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

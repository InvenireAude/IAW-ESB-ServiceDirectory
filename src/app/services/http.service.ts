import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/publishReplay';

import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Request,
  Headers,
  XHRBackend
} from '@angular/http';

import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService extends Http {

  public static CTX_INQUIRY = '/esb-sd/inquiry';
  public static CTX_TESTER = '/esb-sd/tester';

  constructor(
      backend: XHRBackend,
      defaultOptions: RequestOptions,
      private loaderService: LoaderService
  ) {
      super(backend, defaultOptions);
  }

  cache: any = {};

  postRequest(apiContext: string, service: string, data: any, allowCache: boolean) {


    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    data._dmType = service;

    const body = JSON.stringify(data);

   if (!this.cache[body] || !allowCache) {
     this.showLoader();
     this.cache[body] = super.post(apiContext, body, options)
      .map((res: Response) => res.json())
      .catch(this.onCatch)
      .do((res: Response) => {
            this.onSuccess(res);
          }, (error: any) => {
            this.onError(error);
          })
           .finally(() => {
             this.onEnd();
          })
      .publishReplay(1)
      .refCount();
    }

   return this.cache[body];
  }

  requestWithSelector(service: string, selector: any) {
      return this.postRequest('/esb-sd/inquiry', service, { selector : selector }, true);
  }

  requestWithSelectorNoCache(service: string, selector: any) {
    return this.postRequest('/esb-sd/inquiry', service, { selector : selector }, false);
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
      return Observable.throw(error);
  }

  private onSuccess(res: Response): void {
      console.log('Request successful');
  }

  private onError(res: Response): void {
      console.log('Error, status code: ' + res.status);
  }

  private onEnd(): void {
      this.hideLoader();
  }

  private showLoader(): void {
      this.loaderService.show();
  }

  private hideLoader(): void {
      this.loaderService.hide();
  }
}


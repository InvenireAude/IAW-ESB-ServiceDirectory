import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { stringify } from 'querystring';
import { queue } from 'rxjs/internal/scheduler/queue';

@Injectable()
export class SMService {

  constructor(private httpService: HttpService) {
  }

  getStatus() {
    return this.httpService.requestNoCache(
      'http://www.invenireaude.org/sm/api#ServiceStatusCall',
      {});
  }

  getConfig() {
    return this.httpService.requestNoCache(
      'http://www.invenireaude.org/sm/api#ServiceConfigCall',
      {});
  }

  callAction(request: any) {
    return this.httpService.requestNoCache(
      'http://www.invenireaude.org/sm/api#ServiceActionCall',
      {
        request: request
      });
  }

}

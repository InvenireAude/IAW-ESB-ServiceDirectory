import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { stringify } from 'querystring';
import { queue } from 'rxjs/internal/scheduler/queue';

@Injectable()
export class CollectService {

  constructor(private httpService: HttpService) {
  }

  getMessageHistory(selector) {
    return this.httpService.requestWithSelectorNoCache(
      'http://www.invenireaude.com/esbsd/collect/api#GetMessageHistory',
      selector);
  }

  getMessageContent(selector) {
    return this.httpService.requestWithSelectorNoCache(
      'http://www.invenireaude.com/esbsd/collect/api#GetMessageContent',
      selector);
  }


}

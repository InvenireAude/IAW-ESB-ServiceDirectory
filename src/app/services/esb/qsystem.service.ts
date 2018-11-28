import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { stringify } from 'querystring';
import { queue } from 'rxjs/internal/scheduler/queue';

@Injectable()
export class QSystemService {

  constructor(private httpService: HttpService) {
  }

  getStatistics() {
    return this.httpService.requestWithSelectorNoCache(
      'http://www.invenireaude.com/esbsd/qs/api#GetStatistics',
      {});
  }

  getBrokerStats() {
    return this.httpService.requestWithSelectorNoCache(
      'http://www.invenireaude.com/esbsd/broker/api#GetBrokerStats',
      {});
  }

  previewMessages(destination: string, system: string, pageSize: number, pageOffset: number, msgSizeLimit: number) {
    return this.httpService.requestWithSelectorNoCache(
      'http://www.invenireaude.org/qsystem/service#PreviewMessages',
      {
        connectionAlias: system,
        destination: destination,
        window: {
          pageOffset: pageOffset,
          pageSize: pageSize
        },
        msgSizeLimit: msgSizeLimit
      });
  }

}

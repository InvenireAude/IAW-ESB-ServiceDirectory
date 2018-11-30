import { Injectable } from '@angular/core';

import { HttpService } from '../http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TesterService {


    constructor(private httpService: HttpService,
                private httpClient: HttpClient) {
    }

    testService(a, i, f, mid, m) {

        return this.httpService.postRequest(
            '/esb-sd/tester',
            'http://www.invenireaude.com/esbsd/tester#TestService', {
                appl: a,
                interface: i,
                fetch: f,
                ctx: { MID: mid },
                data: m,
            },
            false);

    }

    upload(fileName): Observable<any> {
        return this.httpClient.get(fileName);
    }

    convertToXML(data: string) {

      return this.httpService.postRequest(
        '/esb-sd/tester',
        'http://www.invenireaude.com/esbsd/tester#Convert', {
          dataFrom : data,
          fmtFrom: 'JSON',
          fmtTo: 'XML'
        },
        false);

    }

    convertToJSON(data: string) {

      return this.httpService.postRequest(
        '/esb-sd/tester',
        'http://www.invenireaude.com/esbsd/tester#Convert', {
          dataFrom : data,
          fmtFrom: 'XML',
          fmtTo: 'JSON'
        },
        false);

    }
}

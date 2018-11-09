import { Injectable } from '@angular/core';

import { HttpService } from '../http.service';

@Injectable()
export class LangService {

    constructor(private httpService: HttpService) {
    }

    getProgram(name) {
        return this.httpService.requestWithSelector(
            'http://www.invenireaude.com/esbsd/lang/api#GetPrograms',
            {
                name: name
            });
    }

}


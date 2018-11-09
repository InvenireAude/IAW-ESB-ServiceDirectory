import { Injectable } from '@angular/core';

import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceDirectoryService {

  constructor(private httpService: HttpService) {
  }

  getApplications() {
    return this.httpService.requestWithSelector(
      'http://www.invenireaude.com/esbsd/esb/api#GetApplications',
      {});
  }

  getInterfaces() {
    return this.httpService.requestWithSelector(
      'http://www.invenireaude.com/esbsd/esb/api#GetInterfaces',
      {});
  }

  getInterface(id) {
    return this.httpService.requestWithSelector(
      'http://www.invenireaude.com/esbsd/esb/api#GetInterfaces',
      { id: id });
  }

  getApplication(id) {
    return this.httpService.requestWithSelector(
      'http://www.invenireaude.com/esbsd/esb/api#GetApplications',
      {
        id: id
      });

  }

}


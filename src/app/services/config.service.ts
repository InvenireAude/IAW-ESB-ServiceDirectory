import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class ConfigService {

  public static CTX_CONFIG = '/assets/config/mainmenu.json';

  constructor(private httpService: HttpService) {
  }

  getConfig() {
    console.log('DONE??');
    return this.httpService.getResource(ConfigService.CTX_CONFIG);
  }

}

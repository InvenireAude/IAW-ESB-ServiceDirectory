import { Component, OnInit } from '@angular/core';
import { ServiceDirectoryService } from 'src/app/services/esb/service-directory.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  public services$: any;

  public pagination = {
    page : 1,
    itemsPerPage : 20,
    maxSize : 5,
    numPages: 1,
    length : 0
  };

  public filter = {
    interface: null,
    provider: null,
    consumers: null
  };

  constructor(private serviceDirectoryService: ServiceDirectoryService) { }

  ngOnInit() {
    this.services$ = this.serviceDirectoryService.getApplications().map(
      data => {
        const map = {};
        const result = [];
        if (data.applications) {
          this.extractServices(data, map);
          this.extractClients(data, map);
          for (const i of Object.keys(map)) {
            const ii = map[i];
            for (const s of Object.keys(ii.services)) {
              const ss = ii.services[s];
              const serviceItem = {
                interface : i,
                service   : s,
                provider  : ss.provider,
                consumers : []
              };
              for (const c of Object.keys(ss.consumers)) {
                const cc = ss.consumers[c];
                serviceItem.consumers.push(cc);
              }
              result.push(serviceItem);
            }
          }
        }
        console.log(result);
        return result;
      }
    );
  }


  private extractServices(data: any, map: {}) {
    data.applications.forEach(a => {
      a.interfaceInstances.forEach(i => {
        if (i._dmType === 'http://www.invenireaude.com/esbsd#ServerInterface' && i.services !== undefined) {
            if (map[i.id] === undefined) {
              map[i.id] = {
                interface : i.id,
                services: {}
              };
            }
            i.services.forEach( s => {
              map[i.id].services[s.name] = { provider : a.id , consumers : [] };
            });
        }
      });
    });
  }

  private extractClients(data: any, map: {}) {
    data.applications.forEach(a => {
      a.interfaceInstances.forEach(i => {
        if (i._dmType === 'http://www.invenireaude.com/esbsd#ClientInterface' && i.services !== undefined) {
            i.services.forEach( s => {
              if (map[i.id].services[s.name] !== undefined) {
                map[i.id].services[s.name].consumers.push(a.id);
              }
            });
        }
      });
    });
  }

}

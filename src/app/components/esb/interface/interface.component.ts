import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ServiceDirectoryService } from '../../../services/esb/service-directory.service';
import { TypesService } from '../../../services/esb/types.service';
import { GeneralFilterPipe } from '../../../filters/general-filter.pipe';

import { DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
    selector: 'app-interface',
    templateUrl: './interface.component.html',
    styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {

    interface: any;
    services$: any;

    sub: any;
    id: string;

    public  content: SafeHtml;

    public pagination = {
      page : 1,
      itemsPerPage : 5,
      maxSize : 5,
      numPages: 1,
      length : 0
    };

    public filter = {
        name: null
    };

    public generalFilterPipe: GeneralFilterPipe = new GeneralFilterPipe();

    constructor(private typesService: TypesService,
                private serviceDirectoryService: ServiceDirectoryService,
                private sanitizer: DomSanitizer,
                private route: ActivatedRoute, private router: Router) { }


    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
           this.id = params['id'];
           this.filter.name = params['service'];

            this.serviceDirectoryService.getInterface(this.id).subscribe(
                data => {
                    if (data.interfaces) {
                        this.services$ = this.typesService.getTypeAsService(data.interfaces[0].namespace).map(
                            result => {
                                if (result.response) {
                                    const services = [];
                                    result.response.properties.forEach(p => {
                                        p.content = this.sanitizer.bypassSecurityTrustHtml(p.description);
                                        services.push(p);
                                    });
                                    services.sort((a, b) => {
                                      return a.name.localeCompare(b.name);
                                    });
                                    return services;
                                }
                            });
                      this.interface = data.interfaces[0];
                    } else {
                      this.interface = undefined;
                    }
                });
          });
    }

    ngOnDestroy() {
      if (this.sub) {
        this.sub.unsubscribe();
      }
    }

}

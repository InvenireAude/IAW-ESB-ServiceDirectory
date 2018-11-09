import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ServiceDirectoryService } from '../../../services/esb/service-directory.service';
import { TypesService } from '../../../services/esb/types.service';
import { GeneralFilterPipe } from '../../../filters/general-filter.pipe';


@Component({
    selector: 'app-interface',
    templateUrl: './interface.component.html',
    styleUrls: ['./interface.component.css']
})
export class InterfaceComponent implements OnInit, OnDestroy {

    interface: any;
    services: any[] = [];
    sub: any;
    id: string;
    filteredItems: any[] = [];
    public filter = {
        name: null
    };

    public generalFilterPipe: GeneralFilterPipe = new GeneralFilterPipe();

    constructor(private typesService: TypesService,
                private serviceDirectoryService: ServiceDirectoryService,
                private route: ActivatedRoute, private router: Router) { }

    public applyFilters() {
        if (this.services) {
            this.filteredItems = this.generalFilterPipe.transform(this.services, this.filter);
        }
    }



    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];

            this.serviceDirectoryService.getInterface(this.id).subscribe(
                data => {

                    if (data.interfaces) {

                        this.interface = data.interfaces[0];
                        this.typesService.getTypeAsService(this.interface.namespace).subscribe(
                            result => {
                                if (result.response) {
                                    result.response.properties.forEach(p => {
                                        this.services.push(p);
                                    });
                                    this.applyFilters();
                                }
                            });
                    }
                    return true;
                },
                error => {
                    console.error('Error!');
                    // return Observable.throw(error);
                });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

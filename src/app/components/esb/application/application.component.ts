import { Component, OnInit } from '@angular/core';

import { ServiceDirectoryService } from '../../../services/esb/service-directory.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  private id: string;
  private interfaceToShow: string;
  private interfaceModeToShow: string;

  private sub: any;
  application: any = null;

  constructor(private serviceDirectoryService: ServiceDirectoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.interfaceToShow = params['ii'];
      this.interfaceModeToShow = params['im'];

      this.serviceDirectoryService.getApplication(this.id).subscribe(
        data => {
          // tslint:disable-next-line:one-line
          if (data.applications) {
            this.application = data.applications[0];
            this.application.interfaceInstances.forEach(ii => {

              if (ii._dmType === 'http://www.invenireaude.com/esbsd#ServerInterface') {
                ii.mode = 'Server';
              }

              if (ii._dmType === 'http://www.invenireaude.com/esbsd#ClientInterface') {
                ii.mode = 'Client';
              }

              if (this.interfaceToShow != null && this.interfaceModeToShow != null &&
                this.interfaceToShow === ii.id && this.interfaceModeToShow === ii.mode) {
                ii.isOpen = true;
              } else {
                ii.isOpen = false;
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

}

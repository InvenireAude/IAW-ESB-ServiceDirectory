import { Component, OnInit } from '@angular/core';


import { ServiceDirectoryService } from '../../../services/esb/service-directory.service';


@Component({
  selector: 'app-interfaces',
  templateUrl: './interfaces.component.html',
  styleUrls: ['./interfaces.component.css']
})
export class InterfacesComponent implements OnInit {

  constructor(private serviceDirectoryService: ServiceDirectoryService) { }

  interfaces: any[];

  ngOnInit() {
      this.serviceDirectoryService.getInterfaces().subscribe(
            data => {
            this.interfaces = data.interfaces;
            return true;
       },
       error => {
         console.error("Error!");
        // return Observable.throw(error);
        }
       );
  }

}

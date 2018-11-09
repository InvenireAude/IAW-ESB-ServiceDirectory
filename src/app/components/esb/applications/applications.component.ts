import { Component, OnInit } from '@angular/core';

import { ServiceDirectoryService } from '../../../services/esb/service-directory.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  constructor(private serviceDirectoryService: ServiceDirectoryService) { }

  applications: any[];

  ngOnInit() {
    this.serviceDirectoryService.getApplications().subscribe(
      data => {
        this.applications = data.applications;
        return true;
      },
      error => {
        console.error('Error!');
        // return Observable.throw(error);
      }
    );
  }

}

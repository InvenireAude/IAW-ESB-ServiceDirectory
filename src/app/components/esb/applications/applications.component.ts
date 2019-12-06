import { Component, OnInit } from '@angular/core';

import { ServiceDirectoryService } from '../../../services/esb/service-directory.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications$: any;

  public pagination = {
    page : 1,
    itemsPerPage : 20,
    maxSize : 5,
    numPages: 1,
    length : 0
  };

  public filter = {
    id : null,
    fullName: null
  };

  constructor(
    private serviceDirectoryService: ServiceDirectoryService
    ) { }

  ngOnInit() {
    this.applications$ = this.serviceDirectoryService.getApplications().map(
        data => data.applications.sort((a, b) => {
            return a.id.localeCompare(b.id);
        })
     );
  }

}

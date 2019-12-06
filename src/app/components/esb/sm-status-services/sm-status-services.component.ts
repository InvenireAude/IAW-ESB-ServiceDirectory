import { Component, OnInit, OnDestroy } from '@angular/core';
import { SMService } from '../../../services/esb/sm.service';
import { GeneralFilterPipe } from 'src/app/filters/general-filter.pipe';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-sm-status-services',
  templateUrl: './sm-status-services.component.html',
  styleUrls: ['./sm-status-services.component.css']
})
export class SmStatusServicesComponent implements OnInit, OnDestroy {

  public request = {};
  public response: any;
  public filteredItems = null;

  private interval: any;

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public filter = {
    name: null
  };

  private counter = 0;
  private actionsAllowed = true;

  public generalFilterPipe: GeneralFilterPipe = new GeneralFilterPipe();

  source = interval(1000);

  constructor(private smService: SMService) { }

  ngOnInit() {
    this.refresh();
    this.interval = this.source.subscribe(() => {
      this.countDownToRefresh();
    });
  }


  ngOnDestroy() {
    console.log('ondestroy 1!!');
    this.interval.unsubscribe();
  }

  countDownToRefresh() {
    if (this.counter !== undefined && --this.counter < 0) {
      this.refresh();
    }
  }

  refresh() {
    this.counter = null;
    this.smService.getStatus().subscribe(
      data => {
        if (data.response !== undefined) {
          this.response = data.response;
          this.applyFilters();
          this.counter = 10;
          this.actionsAllowed = true;
        }
      });
  }

  callAction(service: any, action: string) {
    this.actionsAllowed = false;
    this.smService.callAction({
      actions: [{
        selector: {
          pairs: [{
            name: 'name',
            value: service.name
          }]
        },
        action: action
      }]
    }).subscribe(
      data => {
        console.log(data);
        this.counter = 3;
      });
  }

  public applyFilters() {
    if (this.response.services) {
      this.filteredItems = this.generalFilterPipe.transform(this.response.services, this.filter, null);
      this.length = this.filteredItems.length;
      this.page = 1;
    }
  }
}

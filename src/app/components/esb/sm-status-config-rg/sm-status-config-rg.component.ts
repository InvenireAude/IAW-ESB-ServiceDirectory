import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { GeneralFilterPipe } from 'src/app/filters/general-filter.pipe';

@Component({
  selector: 'app-sm-status-config-rg',
  templateUrl: './sm-status-config-rg.component.html',
  styleUrls: ['./sm-status-config-rg.component.css']
})
export class SmStatusConfigRgComponent implements OnInit, OnChanges {

  @Input() config: any;

  public filteredItems = null;
  public generalFilterPipe: GeneralFilterPipe = new GeneralFilterPipe();

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public filter = {
    name: null
  };

  constructor() { }

  ngOnInit() {
    this.applyFilters();
  }

  ngOnChanges() {
    this.applyFilters();
  }

  public applyFilters() {

    if (this.config && this.config.deployment && this.config.deployment.resources) {
      this.filteredItems = this.generalFilterPipe.transform(this.config.deployment.resources, this.filter);
      this.length = this.filteredItems !== undefined ? this.filteredItems.length : 0;
      this.page = 1;
    }
  }
}

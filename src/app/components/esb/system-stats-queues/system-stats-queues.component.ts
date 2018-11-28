import { Component, OnInit, Input } from '@angular/core';
import { GeneralFilterPipe } from '../../../filters/general-filter.pipe';

@Component({
  selector: 'app-system-stats-queues',
  templateUrl: './system-stats-queues.component.html',
  styleUrls: ['./system-stats-queues.component.css']
})
export class SystemStatsQueuesComponent implements OnInit {

  @Input() queues: any[];
  @Input() registryAlias: string;
  public filteredItems = null;

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public filter = {
    name: null
  };

  public generalFilterPipe: GeneralFilterPipe = new GeneralFilterPipe();

  constructor() { }

  ngOnInit() {
    this.applyFilters();
  }

  public applyFilters() {
    if (this.queues) {
      this.filteredItems = this.generalFilterPipe.transform(this.queues, this.filter);
      this.length = this.filteredItems.length;
      this.page = 1;
    }
  }
}

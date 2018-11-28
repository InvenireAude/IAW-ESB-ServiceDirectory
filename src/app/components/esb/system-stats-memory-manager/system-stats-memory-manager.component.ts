import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-system-stats-memory-manager',
  templateUrl: './system-stats-memory-manager.component.html',
  styleUrls: ['./system-stats-memory-manager.component.css']
})
export class SystemStatsMemoryManagerComponent implements OnInit {

  @Input() memoryManager: any;
  @Input() name: string;

  private showDetails = false;
  constructor() { }

  ngOnInit() {
  }

  show() {
    this.showDetails = true;
  }

  hide() {
    this.showDetails = false;
  }

}

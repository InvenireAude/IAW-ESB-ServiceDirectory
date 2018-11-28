import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-system-stats-memory',
  templateUrl: './system-stats-memory.component.html',
  styleUrls: ['./system-stats-memory.component.css']
})
export class SystemStatsMemoryComponent implements OnInit {

  @Input() memory: any;

  constructor() { }

  ngOnInit() {
  }

}

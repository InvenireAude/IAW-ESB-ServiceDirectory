import { Component, OnInit } from '@angular/core';
import { QSystemService } from '../../../services/esb/qsystem.service';

@Component({
  selector: 'app-system-stats',
  templateUrl: './system-stats.component.html',
  styleUrls: ['./system-stats.component.css']
})
export class SystemStatsComponent implements OnInit {

  public systemStats: any;

  constructor(private qsystemService: QSystemService) { }

  ngOnInit() {

    this.qsystemService.getStatistics().subscribe(
      data => {
        if (data.systemStats !== undefined) {
          this.systemStats = data.systemStats;
        }
      });
  }

}

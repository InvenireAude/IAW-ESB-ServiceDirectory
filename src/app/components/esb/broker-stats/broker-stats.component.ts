import { Component, OnInit } from '@angular/core';
import { QSystemService } from '../../../services/esb/qsystem.service';

@Component({
  selector: 'app-broker-stats',
  templateUrl: './broker-stats.component.html',
  styleUrls: ['./broker-stats.component.css']
})
export class BrokerStatsComponent implements OnInit {

  public records: any[] = [];

  public chartDataAvg: any[] = [];
  public chartDataCount: any[] = [];
  public chartLabels: any[] = [];

  constructor(private qsystemService: QSystemService) { }

  ngOnInit() {
    this.qsystemService.getBrokerStats().subscribe(
      data => {
        if (data.records !== undefined) {
          this.records = data.records;
          console.log(this.records.length);
          this.records.forEach(r => {
            this.chartLabels.push(r.key);
            this.chartDataAvg.push(r.avg);
            this.chartDataCount.push(r.count);
          });
        }
      });
  }

}

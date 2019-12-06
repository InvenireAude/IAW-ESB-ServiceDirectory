import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-lines',
  templateUrl: './chart-lines.component.html',
  styleUrls: ['./chart-lines.component.css']
})
export class ChartLinesComponent implements OnInit, AfterViewInit {

  private month = ['Jan', 'Feb', 'Mar'];
  private price = [4.2, 2, 1.3];
  public chart: any;

  public defaultColors = [
    [255, 99, 132],
    [54, 162, 235],
    [255, 206, 86],
    [231, 233, 237],
    [75, 192, 192],
    [151, 187, 205],
    [220, 220, 220],
    [247, 70, 74],
    [70, 191, 189],
    [253, 180, 92],
    [148, 159, 177],
    [77, 83, 96]
  ];


  @ViewChild('myId') myId: ElementRef;

  constructor() {
  }

  ngAfterViewInit() {
    console.log(this.myId.nativeElement);
  }

  ngOnInit() {
    return;
    this.chart = new Chart(this.myId, {
      type: 'horizontalBar',
      data: {
        labels: this.month,
        datasets: [
          {
            data: this.price,
            // tslint:disable-next-line:max-line-length
            backgroundColor: [this.getColor(0), this.getColor(1)],
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });

    console.log(this.chart);
  }

  rgba(colour: Array<number>, alpha: number): string {
    return 'rgba(' + colour.concat(alpha).join(',') + ')';
  }

  getColor(i: number) {
    if (i < this.defaultColors.length) {
      return this.rgba(this.defaultColors[i], 0.2);
    } else {
      return this.rgba([
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ], 0.2);
    }

  }

}

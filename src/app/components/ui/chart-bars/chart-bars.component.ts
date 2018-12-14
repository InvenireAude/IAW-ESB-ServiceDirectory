import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart-bars',
  templateUrl: './chart-bars.component.html',
  styleUrls: ['./chart-bars.component.css']
})
export class ChartBarsComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() labels: any[] = [];

  public chart: any;
  public colors = [];

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

  constructor() {
    }


  ngOnInit() {

    console.log(this.data);

    for (let i = 0; i < this.data.length; i++) {
      this.colors.push(this.getColor(i));
    }

    this.chart = new Chart('canvas321', {
      type: 'horizontalBar',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
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
            display: true,
          }],
          yAxes: [{
            display: true,
            barPercentage: 0.8,
            // categoryPercentage: 1.0,
            // maxBarThickness: 25
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

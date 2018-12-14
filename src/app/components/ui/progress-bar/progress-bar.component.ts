import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnChanges {

  @Input() percent;

  public percentStyle;
  public percentColor;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.percentStyle = '' + this.percent + '%';
    if (this.percent > 90) {
      this.percentColor = 'bg-danger';
    } else if (this.percent > 70) {
      this.percentColor = 'bg-warning';
   } else if (this.percent > 40) {
    this.percentColor = 'bg-info';
   } else {
    this.percentColor = 'bg-success';
   }
  }

}

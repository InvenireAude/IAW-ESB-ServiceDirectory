import { Component, OnInit } from '@angular/core';
import { ServiceDirectoryService } from 'src/app/services/esb/service-directory.service';
import { CollectService } from 'src/app/services/esb/collect.service';

import { NgbDateParserFormatter, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}
export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}
export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

@Component({
  selector: 'app-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.css']
})
export class CollectorComponent implements OnInit {

  public applications: any[];
  public messages = [];
  public dsBeginTo:   NgbDateStruct;
  public dsBeginFrom: NgbDateStruct;

  public timeBeginTo    = { hour: 13, minute: 30};
  public timeBeginFrom  = { hour: 13, minute: 30};


  public selector = {
    tsBeginTo: null,
    tsBeginFrom: null
  };


  constructor(
    private serviceDirectoryService: ServiceDirectoryService,
    private collectService: CollectService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {

    this.dsBeginFrom = this.calendar.getToday();
    this.dsBeginTo = this.calendar.getToday();

    const date = new Date();

    this.timeBeginTo = { hour: date.getHours() + 1, minute: date.getMinutes() };
    this.timeBeginFrom = { hour: date.getHours() - 1, minute: date.getMinutes()};

    console.log(JSON.stringify(this.timeBeginFrom));
    this.serviceDirectoryService.getApplications().subscribe(
      (data) => {
          this.applications = data.applications;
      });

  }

  makeTimestamp(date: NgbDateStruct, time: any): string {
    return date ?
        date.year + '-' +
        padNumber(date.month) + '-' +
        padNumber(date.day) + 'T' +
        padNumber(time.hour)  + ':' +
        padNumber(time.minute) + ':00' :
        null;
  }

  makeSelector() {

    this.selector.tsBeginTo = this.makeTimestamp(this.dsBeginTo, this.timeBeginTo);
    this.selector.tsBeginFrom = this.makeTimestamp(this.dsBeginFrom, this.timeBeginFrom);
  }

  send() {

    this.makeSelector();
    this.collectService.getMessageHistory(this.selector).subscribe(
      (data) => {
        if (data.messages !== undefined) {
          this.messages = data.messages;
        } else {
          this.messages = [];
        }
      });

  }

  show(m) {

    if (m.show !== undefined) {
      m.show = !m.show;
      return;
    }

    this.collectService.getMessageContent({ tsBegin: m.tsBegin, refId: m.refId }).subscribe(
      (data) => {

        if (data.request !== undefined) {
          m.request = data.request;
          m.type = m.request.substr(0, 5) === '<?xml' ? 'xml' : 'json';
        }

        if (data.response !== undefined) {
          m.response = data.response;
          m.type = m.response.substr(0, 5) === '<?xml' ? 'xml' : 'json';
        }



        m.show = true;
      });
  }

  showAll() {
    this.messages.forEach(m => {
      this.show(m);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ServiceDirectoryService } from 'src/app/services/esb/service-directory.service';
import { CollectService } from 'src/app/services/esb/collect.service';

import { NgbDateParserFormatter, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TypesService } from 'src/app/services/esb/types.service';

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

  public applications: any[] = [];
  public interfaces: any[] = [];

  public messages = [];
  public dsBeginTo: NgbDateStruct;
  public dsBeginFrom: NgbDateStruct;

  public timeBeginTo = { hour: 13, minute: 30 };
  public timeBeginFrom = { hour: 13, minute: 30 };

  public srcAppl: string = null;
  public dstAppl: string = null;

  public interface: any = null;
  public service: string = null;
  public refId: string = null;
  public parentId: string = null;

  constructor(
    private serviceDirectoryService: ServiceDirectoryService,
    private serviceTypesService: TypesService,
    private collectService: CollectService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {

    this.dsBeginFrom = this.calendar.getToday();
    this.dsBeginTo = this.calendar.getToday();

    const date = new Date();

    this.timeBeginTo = { hour: date.getHours() + 1, minute: date.getMinutes() };
    this.timeBeginFrom = { hour: date.getHours() - 1, minute: date.getMinutes() };

    console.log(JSON.stringify(this.timeBeginFrom));

    this.serviceDirectoryService.getApplications().subscribe(
      (data) => {
        this.applications = data.applications;
      });

    this.serviceDirectoryService.getInterfaces().subscribe(
      (data) => {
        if (data.interfaces) {
          this.interfaces = data.interfaces;
          console.log(this.interfaces);
          this.interfaces.forEach(i => {
            this.serviceTypesService.getTypeAsService(i.namespace).subscribe(data1 => {
              if (data1.response && data1.response.properties) {
                i.services = data1.response.properties;
              }
            });
          });
        }
      });

  }

  makeTimestamp(date: NgbDateStruct, time: any): string {
    return date ?
      date.year + '-' +
      padNumber(date.month) + '-' +
      padNumber(date.day) + 'T' +
      padNumber(time.hour) + ':' +
      padNumber(time.minute) + ':00' :
      null;
  }

  makeSelector() {
    const selector: any = {};

    selector.tsBeginTo = this.makeTimestamp(this.dsBeginTo, this.timeBeginTo);
    selector.tsBeginFrom = this.makeTimestamp(this.dsBeginFrom, this.timeBeginFrom);

    if (this.srcAppl) {
      selector.srcAppl = this.srcAppl;
    }

    if (this.srcAppl) {
      selector.srcAppl = this.srcAppl;
    }

    if (this.interface) {
      selector.interface = this.interface.id;
    }

    if (this.service) {
      selector.service = this.service;
    }

    if (this.refId) {
      selector.refId = this.refId;
    }

    if (this.parentId) {
      selector.parentId = this.parentId;
    }

    return selector;
  }

  send() {

    this.collectService.getMessageHistory(this.makeSelector()).subscribe(
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

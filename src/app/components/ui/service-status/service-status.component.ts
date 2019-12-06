import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.css']
})
export class ServiceStatusComponent implements OnInit {

  @Input() status = null;

  constructor() { }

  ngOnInit() {

  }

}

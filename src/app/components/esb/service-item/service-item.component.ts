import { Component, OnInit,  AfterViewInit,  Input, ViewChild, ElementRef } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';


@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.css']
})


export class ServiceItemComponent implements OnInit, AfterViewInit {

  static CVersionsToShowLimit = 2;

  @Input() service: any;
  @ViewChild('doc', {read: ElementRef}) docref: ElementRef;

  public config = {};
  public info = {};
  public versionsToShow: number = ServiceItemComponent.CVersionsToShowLimit;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getConfig().subscribe(
      config => this.config = config
    );
  }

  ngAfterViewInit(): void {

      if (this.docref !== undefined && this.docref !== null) {

        const info = {
          status : null,
          versions : []
        };

        const elemStatus = this.docref.nativeElement.querySelector('status');

        if (elemStatus) {
          info.status = elemStatus.innerHTML;
          this.docref.nativeElement.querySelectorAll('status').forEach(v => {
            v.remove();
          });
        }

        this.docref.nativeElement.querySelectorAll('versions').forEach(v => {
          info.versions.push({
            id: v.getAttribute('id'),
            changeId: v.getAttribute('changeid'),
            title: v.innerHTML,
          });
           v.remove();
        });

        setTimeout(() => {
          this.info = info;
        }, 0);
      }
  }

  showAllVersions() {
    this.versionsToShow = 99999;
  }


}

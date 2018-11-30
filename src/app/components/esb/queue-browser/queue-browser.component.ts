import { Component, OnInit } from '@angular/core';
import { QSystemService } from '../../../services/esb/qsystem.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue-browser',
  templateUrl: './queue-browser.component.html',
  styleUrls: ['./queue-browser.component.css']
})
export class QueueBrowserComponent implements OnInit {

  public messages = [];
  public queue: string;
  public system: string;

  public page = 1;
  public itemsPerPage = 5;

  public msgSizeLimit: number;
  public numMessages = 0;
  private sub: any;

  constructor(private qsystemService: QSystemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      if (params['queue']) {
        this.queue = params['queue'];
      }

      if (params['system']) {
        this.system = params['system'];
      }

      if (params['page']) {
        this.page = params['page'];
      } else {
        this.page = 1;
      }

      this.msgSizeLimit = 64 * 1024;

      this.qsystemService.previewMessages(
        this.queue,
        this.system,
        this.itemsPerPage,
        (this.page - 1) * this.itemsPerPage,
        this.msgSizeLimit).subscribe(
          data => {
            if (data.messages !== undefined) {
              this.messages = data.messages;
              this.numMessages = data.status.numMessages;
            }
          });

    });
  }

  public loadPage(page: number) {
    this.router.navigate(['/queueBrowser' , { queue: this.queue, system: this.system, page: this.page }]);
  }

}

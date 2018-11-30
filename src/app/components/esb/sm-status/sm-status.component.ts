import { Component, OnInit } from '@angular/core';
import { SMService } from 'src/app/services/esb/sm.service';

@Component({
  selector: 'app-sm-status',
  templateUrl: './sm-status.component.html',
  styleUrls: ['./sm-status.component.css']
})
export class SMStatusComponent implements OnInit {

  public config: any;

  constructor(private smService: SMService) { }

  ngOnInit() {
    this.smService.getConfig().subscribe(
      data => {
        if (data.response !== undefined) {
          this.config = data.response;
        }
      });
  }


}

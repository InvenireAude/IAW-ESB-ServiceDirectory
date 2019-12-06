import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public config: any;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    console.log(this.configService);
    this.configService.getConfig().subscribe(
      data => {
        this.config = data;
        console.log('DONE!!');
        return true;
      });
    console.log('DONE?');
  }

}

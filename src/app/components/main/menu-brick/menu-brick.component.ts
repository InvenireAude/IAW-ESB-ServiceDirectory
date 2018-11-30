import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-brick',
  templateUrl: './menu-brick.component.html',
  styleUrls: ['./menu-brick.component.css']
})
export class MenuBrickComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;
  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AfterContentInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterContentInit {

  private node: string;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {

  }

  ngAfterContentInit() {
  }

}

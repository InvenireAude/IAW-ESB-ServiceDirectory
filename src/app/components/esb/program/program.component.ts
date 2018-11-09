import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Lexer } from '../../../services/esb/lexer';
import { LangService } from '../../../services/esb/lang.service';

declare var Lexed: any;
declare var YScript2HTML: any;
declare var links: any;

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  sub: any;
  program: any;
  name: string;

  lexer: Lexer = new Lexer();

  constructor(private langService: LangService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    const mylinks = {
      mkTypeLink: function (t, ns) {
        return '/type;type=' + t + ';ns=' + encodeURIComponent(ns.split('"')[1]);
      },
      mkProgramLink: function (p) {
        return '/program;name=' + encodeURIComponent(p);
      }
    };

    this.sub = this.route.params.subscribe(params => {
      this.name = params['name'];
      this.langService.getProgram(this.name).subscribe(
        data => {
          if (data.programs) {
            this.program = {};
            // var r = Lexer.rules;
            this.program.source = data.programs[0].source;
            this.program.source = this.lexer.YScript2HTML(mylinks, data.programs[0].source);

            this.program.lines = this.program.source.split(/\r?\n/);

          }
          return true;
        },
        error => {
          console.error('Error!');
          // return Observable.throw(error);
        });
    });
  }

}

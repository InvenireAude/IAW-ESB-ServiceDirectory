import { Component, OnInit } from '@angular/core';

import { TypesService } from '../../../services/esb/types.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  info: any = null;
  private sub: any;
  typeName: string;
  typeNamespace: string;
  isMulti: boolean;

  constructor(private typesService: TypesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {


      this.typeName = params['type'];
      this.typeNamespace = params['ns'];

      this.typesService.getTypeInfo(this.typeName, this.typeNamespace).subscribe(data => {

        this.isMulti = data.response._dmType === 'http://www.invenireaude.org/qsystem/typeinfo#Object';

        this.info = data.response;
        return true;
      },
        error => {
          console.error('Error!');
          // return Observable.throw(error);
        }
      );
    });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';

import { TypesService } from '../../../services/esb/types.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})

export class TypesComponent implements OnInit, OnDestroy {

  types$: any;

  private sub: any;
  typeNamespace = '';


  public pagination = {
    page : 1,
    itemsPerPage : 20,
    maxSize : 5,
    numPages: 1,
    length : 0
  };

  public filter = {
    name: null,
    namespace: null
  };


  constructor(private typesService: TypesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      if (params['ns']) {
        this.typeNamespace = params['ns'];
      } else {
        this.typeNamespace = '';
      }

      this.filter = {
        name: null,
        namespace: this.typeNamespace
      };

      this.pagination.page = 1;

      this.types$ = this.typesService.getTypes(this.typeNamespace).map(
        data => data.types.sort((a, b) => {
          if ( a.name === b.name) {
            return a.namespace.localeCompare(b.namespace);
          } else {
            return a.name.localeCompare(b.name);
          }
        })
      );
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}


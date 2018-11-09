import { Component, OnInit } from '@angular/core';

import { TypesService } from '../../../services/esb/types.service';
import { Router, ActivatedRoute } from '@angular/router';

import { GeneralFilterPipe } from '../../../filters/general-filter.pipe';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})

export class TypesComponent implements OnInit {

  types: any[];
  filteredItems: any[];
  private sub: any;
  typeNamespace = '';

  public page = 1;
  public itemsPerPage = 20;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public filter = {
    name: null,
    'namespace': null
  };

  public generalFilterPipe: GeneralFilterPipe = new GeneralFilterPipe();

  constructor(private typesService: TypesService, private route: ActivatedRoute, private router: Router) { }

  public applyFilters() {
    if (this.types) {
      this.filteredItems = this.generalFilterPipe.transform(this.types, this.filter);
      this.length = this.filteredItems.length;
      this.page = 1;
    }
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      if (params['ns']) {
        this.typeNamespace = params['ns'];
      } else {
        this.typeNamespace = '';
      }

      this.filter = {
        name: null,
        'namespace': this.typeNamespace
      };

      this.typesService.getTypes(this.typeNamespace).subscribe(
        data => {
          this.types = data.types;
          this.applyFilters();
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


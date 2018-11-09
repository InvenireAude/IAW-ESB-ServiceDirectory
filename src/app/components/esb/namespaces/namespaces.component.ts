import { Component, OnInit } from '@angular/core';
import { TypesService } from '../../../services/esb/types.service';

@Component({
  selector: 'app-namespaces',
  templateUrl: './namespaces.component.html',
  styleUrls: ['./namespaces.component.css']
})

export class NamespacesComponent implements OnInit {

  namespaces: any[] = [];
  filteredItems: any[] = [];
  public filter = {
    'namespace': null
  };

  constructor(private typesService: TypesService) { }

  public applyFilters() {
    if (this.namespaces) {
      this.filteredItems = [];
      this.namespaces.forEach(n => {
        if (this.filter.namespace == null || n.toLowerCase().indexOf(this.filter.namespace.toLowerCase()) !== -1) {
          this.filteredItems.push(n);
        }
      });
    }
  }

  ngOnInit() {

    this.typesService.getNamespaces().subscribe(
      data => {

        data.namespaces.forEach(n => {
          if (!n.match(/IAS\/Script/g)) {
            this.namespaces.push(n);
          }
        });
        this.applyFilters();
        return true;
      },
      error => {
        console.error('Error!');
        // return Observable.throw(error);
      }
    );
  }

}

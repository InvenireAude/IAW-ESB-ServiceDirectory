import { Injectable } from '@angular/core';

import {Http} from '@angular/http';
import {HttpService} from '../http.service';

import 'rxjs/add/operator/map';


@Injectable({
    providedIn: 'root'
  })

  export class TypesService {

  constructor(private httpService: HttpService) {
  }

  getTypes(typeNamespace) {
     return this.httpService.requestWithSelector(
         'http://www.invenireaude.com/esbsd/dm/api#GetTypes',
        {
          typeNamespace: typeNamespace
        });

  }

   getNamespaces() {
     return this.httpService.requestWithSelector(
         'http://www.invenireaude.com/esbsd/dm/api#GetNamespaces',
        {});

  }

 private getTypeInfoImpl(typeName, typeNamespace) {
  return this.httpService.requestWithSelector(
     'http://www.invenireaude.com/esbsd/dm/api#GetTypeInfo',
        {
              typeName : typeName,
              typeNamespace: typeNamespace,
              directExtensions : true,
              allExtensions : true,
              references : true
         });

  }

  getTypeInfo(typeName, typeNamespace) {
       return this.getTypeInfoImpl(typeName, typeNamespace).map(data => {
                if (data.response) {
                    data.response.isComplex = data.response._dmType === 'http://www.invenireaude.org/qsystem/typeinfo#Object';
                    data.response.isSimple  = data.response._dmType === 'http://www.invenireaude.org/qsystem/typeinfo#SimpleType';
                    }
                return data;
          });
  }

  getTypeAsService(serviceNamespace) {

      return this.getTypeInfo('RootType', serviceNamespace).map(data => {
                     data.response.properties.forEach(p => {
                           p.program = this.findProgram(p.description);
                    });
                return data;
          });
  }


  private findProgram(d: string) {

      if (d == null) {
          return null;
      }

      const p = d.match(/[\w\d]+(::[\w\d]+)+\(\)/);

      if (p == null || p.length === 0) {
          return null;
      }

      return p[0].match(/[\w\d]+(::[\w\d]+)+/)[0];
  }

}

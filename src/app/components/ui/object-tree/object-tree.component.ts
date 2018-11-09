import { Component, Input, OnInit } from '@angular/core';
import { TypesService } from '../../../services/esb/types.service';

@Component({
    selector: 'app-object-tree',
    templateUrl: './object-tree.component.html',
    styleUrls: ['./object-tree.component.css']
})
export class ObjectTreeComponent implements OnInit {

    @Input() node: any;
    extension: any = null;

    constructor(private typesService: TypesService) { }

    ngOnInit() {

        if (this.node.values === undefined) {
            this.node.values = [];
        }

        this.typesService.getTypeInfo(this.node.typeName, this.node.typeNamespace).subscribe(
            data => {
                this.node.info = data.response;
                if (this.node.root) {
                    this.createValue();
                }
            });
    }

    private createValue() {

        const value = {};

        if (this.node.root) {
            value['_dmType'] = this.node.typeNamespace + '#' + this.node.typeName;
        }

        if (this.node.info.isSimple) {

            value['_value'] = '';

            if (this.extension != null) {
                value['_dmType'] = this.extension.namespace + '#' + this.extension.name;
            }

        } else {

            if (this.node.info !== undefined && this.node.info.properties !== undefined) {

                let properties: any[] = this.node.info.properties;

                if (this.extension != null) {
                    value['_dmType'] = this.extension.namespace + '#' + this.extension.name;

                    if (this.extension.properties) {
                        properties = this.extension.properties;
                    }
                }

                properties.forEach(p => {
                    const newProperty = {
                        name: p.name,
                        typeName: p.typeName,
                        typeNamespace: p.typeNamespace,
                        isList: p.isList,
                        root: false
                    };

                    value[p.name] = newProperty;
                });
            }
        }

        this.node.values.push(value);

    }

    setExtension(e) {

        this.extension = null;

        if (e !== '') {
            const ext = this.node.info.allExtensions[e];
            this.typesService.getTypeInfo(ext.name, ext.namespace).subscribe(
                data => {
                    this.extension = data.response;
                });
        }
    }

    expand() {
        this.createValue();
    }

    delete(i) {
        this.node.values.splice(i, 1);
    }

}

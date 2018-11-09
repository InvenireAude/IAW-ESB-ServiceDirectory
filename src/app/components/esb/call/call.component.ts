import { Component, OnInit } from '@angular/core';

import { TypesService } from '../../../services/esb/types.service';
import { TesterService } from '../../../services/esb/tester.service';
import { ServiceDirectoryService } from '../../../services/esb/service-directory.service';


import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';
import { ValueTransformer } from '@angular/compiler/src/util';


@Component({
    selector: 'app-call',
    templateUrl: './call.component.html',
    styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {

    sub: any;
    application: string;
    service: string;
    interface: string;
    interfaceImpl: any = {};
    serviceImpl: any = {};

    rootProperty: any;
    output: any;
    input: any;

    file: any;

    private setting = {
        element: {
            dynamicDownload: null as HTMLElement
        }
    };

    constructor(private typesService: TypesService,
        private testerService: TesterService,
        private serviceDirectoryService: ServiceDirectoryService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {

            this.application = params['app'];
            this.service = params['svc'];
            this.interface = params['ii'];



            this.serviceDirectoryService.getInterface(this.interface).subscribe(
                data => {
                    if (data.interfaces) {
                        this.interfaceImpl = data.interfaces[0];
                        this.typesService.getTypeAsService(this.interfaceImpl.namespace).subscribe(result => {
                            if (result.response) {
                                result.response.properties.forEach(p => {
                                    if (p.name === this.service) {
                                        this.serviceImpl = p;
                                        this.rootProperty = {
                                            name: 'Root',
                                            typeName: this.serviceImpl.typeName,
                                            typeNamespace: this.serviceImpl.typeNamespace,
                                            isList: false,
                                            root: true,
                                        };
                                        console.log(this.rootProperty);
                                    }
                                });
                            }
                        });
                    }
                    return true;
                },
                error => {
                    console.error('Error!');
                    // return Observable.throw(error);
                });
        });

    }

    private prepareValues(node) {

        if (node.values.length === 0) {
            return null;
        }

        if (node.isList) {

            const result = [];

            if (node.info.isSimple) {
                node.values.forEach(v => {
                    if (v._dmType) {
                        result.push(v);
                    } else {
                        result.push(v._value);
                    }
                });
            } else {
                node.values.forEach(v => {
                    result.push(this.prepareNode(v));
                });
            }

            return result;

        } else {

            if (node.info.isSimple) {
                const v = node.values[0];

                if (v._dmType) {
                    return (v);
                } else {
                    return v._value;
                }
            }

            return this.prepareNode(node.values[0]);
        }

    }

    private prepareNode(node) {

        const result = {};

        for (const property in node) {
            if (node.hasOwnProperty(property)) {

                if (property === '_dmType') {
                    result[property] = node[property];
                } else {
                    const value = this.prepareValues(node[property]);
                    if (value) {
                        result[property] = value;
                    }
                }
            }
        }
        return result;
    }

    private prepareOutput() {
        this.output = this.prepareValues(this.rootProperty);
    }

    send() {
        console.log('Sending ...', this.rootProperty);
        this.prepareOutput();
        console.log(this.output);

        this.testerService.testService(this.application, this.interface, true, 'MID1234', this.output).subscribe(
            data => {
                this.input = data;
            });

    }

    fileChanged(e) {
        this.file = e.target.files[0];
    }


    buildProperties(node, value, properties) {

        const newValue = {};
        properties.forEach(p => {
            const newProperty = {
                name: p.name,
                typeName: p.typeName,
                typeNamespace: p.typeNamespace,
                isList: p.isList,
                root: false,
                values: []
            };

            if (value._dmType !== undefined) {
                newValue['_dmType'] = value._dmType;
            } else {
                newValue['_dmType'] = node.typeNamespace + '#' + node.typeName;
            }
            newValue[p.name] = newProperty;

            if (p.isList) {
                if (value[p.name] !== undefined) {
                    value[p.name].forEach(v => {
                        this.buildTreeNodeInfo(newProperty, v);
                    });
                }
            } else {
                if (value[p.name] !== undefined) {
                    this.buildTreeNodeInfo(newProperty, value[p.name]);
                }
            }
        });
        node.values.push(newValue);
    }

    buildTreeData(node, value) {

        if (node.info.isSimple) {

            if (typeof(value) !== 'object') {
                node.values.push({
                    '_value' : value
                });
            } else {
                node.values.push(value);
            }

        } else {

            if (node.info !== undefined && node.info.properties !== undefined) {
                if (value._dmType !== undefined) {
                    const strTmp = value._dmType.split('#');
                    this.typesService.getTypeInfo(strTmp[1], strTmp[0]).subscribe(
                        result => {
                            const info = result.response;
                            this.buildProperties(node, value, info.properties);
                        });
                } else {
                    this.buildProperties(node, value, node.info.properties);
                }
            }
        }
    }

buildTreeNodeInfo(node, data) {

    this.typesService.getTypeInfo(node.typeName, node.typeNamespace).subscribe(
        result => {
            node.info = result.response;
            console.log(node.info);
            this.buildTreeData(node, data);
        });
}

buildTreeRoot(data) {

    const node = {
        name: 'Root',
        typeName: this.serviceImpl.typeName,
        typeNamespace: this.serviceImpl.typeNamespace,
        isList: false,
        root: true,
        info: null,
        values: []
    };

    this.buildTreeNodeInfo(node, data);

    return node;
}

uploadDocument(file) {
    console.log(this.rootProperty);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        console.log(fileReader.result);
        console.log(fileReader.result.toString());
        const strValue = fileReader.result.toString();
        this.rootProperty = this.buildTreeRoot(JSON.parse(strValue));
        console.log(JSON.stringify(this.buildTreeRoot(JSON.parse(strValue))));
    };
    fileReader.readAsText(this.file);
}

fakeValidateUserData() {
    return of(this.input.data);
}

download() {
    this.fakeValidateUserData().subscribe((res) => {
        this.dynamicDownloadByHtmlTag({
            fileName: this.rootProperty.typeName + '.json',
            text: JSON.stringify(res, null, 2)
        });
    });
}

    // TODO move to a library/service
    private dynamicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
}) {
    if (!this.setting.element.dynamicDownload) {
        this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    const event = new MouseEvent('click');
    element.dispatchEvent(event);
}

}


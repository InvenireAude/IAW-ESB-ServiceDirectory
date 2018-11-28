import { Component, OnInit, Input } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-download-content',
  templateUrl: './download-content.component.html',
  styleUrls: ['./download-content.component.css']
})
export class DownloadContentComponent implements OnInit {

  @Input() data: any;
  @Input() dataType: string;
  @Input() fileName: string;

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  };

  constructor() { }

  ngOnInit() {
  }

  fakeValidateUserData() {
    return of(this.data);
  }

  download() {
    this.fakeValidateUserData().subscribe((data) => {
      this.dynamicDownloadByHtmlTag({
        fileName: this.fileName + '.' + this.dataType,
        text: data
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
    const fileType = 'text/' + this.dataType;
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    const event = new MouseEvent('click');
    element.dispatchEvent(event);
  }
}

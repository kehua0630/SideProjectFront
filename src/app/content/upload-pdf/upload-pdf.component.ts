import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { UploadService } from './service/upload.service';


@Component({
  selector: 'app-upload-pdf',
  templateUrl: './upload-pdf.component.html',
  styleUrls: ['./upload-pdf.component.scss']
})
export class UploadPdfComponent implements OnInit {

  uploadList: NzUploadFile[] = [];

  constructor(
    private msg: NzMessageService,
    private uploadSvc: UploadService
  ) { }


  ngOnInit(): void {
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    console.log({ file })
    let fileStatus = 'error';
    if (fileList.length > 0) {
      fileStatus = fileList[0].status || 'error';
    }

    if ('error' === fileStatus || 'done' === fileStatus) {
      console.log(this.uploadList.findIndex(item => item.uid === file.uid))
      if (this.uploadList.findIndex(item => item.uid === file.uid) === -1) {

        file.status = 'done';
        this.uploadList?.push(file);
        console.log(file.originFileObj)
        if (file.originFileObj) {

          this.uploadSvc.uploadFile(file.originFileObj).subscribe(res => {
            console.log(res)
            this.msg.success("上傳成功!")
            this.uploadList = [];
          })
        }
      }

    }
  }

}

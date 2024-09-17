import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/service/api-request.service';
import { API, RETCODE } from 'src/app/shared/const/common.const';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(
    private apiSvc: ApiRequestService
  ) { }

  uploadFile(file: File) {
    const url = API.UPLOAD;
    console.log(url)

    return this.apiSvc.uploadFile(file, url).pipe(
      map((res) => {
        if (RETCODE.SUCCESS !== res.RetCode) {
          throw res.RetMsg;
        }
        return res.RetResult;
      })
    );
  }
}

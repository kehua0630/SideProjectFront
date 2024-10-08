import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/service/api-request.service';
import { HTTP_METHOD, API, RETCODE } from 'src/app/shared/const/common.const';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private apiSvc: ApiRequestService
  ) { }

  login(loginInfo: { userName: string, pwd: string }) {
    const url = API.LOGIN;

    return this.apiSvc.requestUrl(HTTP_METHOD.POST, loginInfo, url).pipe(
      map((res) => {
        if (RETCODE.SUCCESS !== res.RetCode) {
          throw res.RetMsg;
        }
        return res.RetResult;
      })
    );
  }
}

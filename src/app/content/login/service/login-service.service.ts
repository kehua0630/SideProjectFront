import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/service/api-request.service';
import { Observable } from 'rxjs';
import { HTTP_METHOD, API, RETCODE } from 'src/app/shared/const/common.const';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private apiSvc: ApiRequestService
  ) { }

  login(loginInfo: { userName: string, pwd: string }) {
    const url = API.LOGIN;

    return this.apiSvc.request(HTTP_METHOD.POST, loginInfo, url).pipe(
      map((res) => {
        if (RETCODE.SUCCESS !== res.RetCode) {
          throw res.RetMsg;
        }
        return res.RetResult.map((account: any) => {
          return {
            id: account._id,
            userName: account.userName,
            pwd: account.pwd,
            createTime: account.createTime,
            inUse: account.inUse,
            func: account.func
          }
        });
      })
    );
  }
}

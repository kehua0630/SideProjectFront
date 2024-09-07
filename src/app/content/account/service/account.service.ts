import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP_METHOD, API, RETCODE } from 'src/app/shared/const/common.const';
import { ApiRequestService } from 'src/app/shared/service/api-request.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private apiSvc: ApiRequestService
  ) { }

  getAccountList(): Observable<Account[]> {
    const url = API.ACCOUNT;

    return this.apiSvc.request(HTTP_METHOD.GET, null, url).pipe(
      map((res) => {
        if (RETCODE.SUCCESS !== res.RetCode) {
          throw res.RetMsg;
        }
        return res.RetResult;
      })
    );
  }

  addAccount(account: Account): any {
    const url = API.ACCOUNT;
    console.log('post account',account)
    return this.apiSvc.request(HTTP_METHOD.POST, account, url).pipe(
      map((res) => {
        console.log(res);
        if (RETCODE.SUCCESS !== res.RetCode) {
          throw res.RetMsg;
        }
        return res;
      })
    );
  }
}


export interface Account {
  id?: string;
  userName: string;
  pwd: string;
  createTime: string;
  inUse: 'Y' | 'N';
  func: string[];
}
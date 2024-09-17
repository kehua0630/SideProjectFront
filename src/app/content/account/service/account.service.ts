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

    return this.apiSvc.requestUrl(HTTP_METHOD.GET, null, url).pipe(
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

  addAccount(account: Account): Observable<any> {
    const url = API.ACCOUNT;
    console.log('post account', account)
    return this.apiSvc.requestUrl(HTTP_METHOD.POST, account, url).pipe(
      map((res) => {
        console.log(res);
        if (RETCODE.SUCCESS !== res.RetCode) {
          throw res.RetMsg;
        }
        return res;
      })
    );
  }

  updateAccount(account: Account): Observable<any> {
    const url = API.ACCOUNT + `/${account.id}`;
    console.log('put account', account);
    return this.apiSvc.requestUrl(HTTP_METHOD.PUT, account, url).pipe(
      map((res) => {
        console.log(res);
        if (RETCODE.SUCCESS !== res.RetCode) {
          throw res.RetMsg;
        }
        return res;
      })
    );
  }

  deleteAccount(accountId: string): Observable<any> {
    const url = API.ACCOUNT + `/${accountId}`;
    console.log('delete account', accountId)
    return this.apiSvc.requestUrl(HTTP_METHOD.DELETE, null, url).pipe(
      map((res) => {
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
  inUse: boolean;
  func: { label: string, value: string, checked: boolean }[];
}
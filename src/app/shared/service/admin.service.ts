import { Injectable } from '@angular/core';
import { ApiRequestService } from 'src/app/shared/service/api-request.service';
import { Observable } from 'rxjs';
import { HTTP_METHOD, API, RETCODE } from 'src/app/shared/const/common.const';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Account } from 'src/app/content/account/service/account.service';
import { ROUTING_PATH } from '../const/router.const';
import { COMMON } from 'src/app/shared/const/common.const';


@Injectable({
    providedIn: 'root'
})
export class AdminService {

    user?: Account;

    functionList = [
        {
            name: '跑馬燈',
            imageUrl: './assets/function/board.png',
            routerPath: ROUTING_PATH.MARQUEE
        },
        {
            name: '上傳PDF',
            imageUrl: './assets/function/pdf.png',
            routerPath: ROUTING_PATH.UPLOAD_PDF
        },
        {
            name: '帳號',
            imageUrl: './assets/function/account.png',
            routerPath: ROUTING_PATH.ACCOUNT
        },
    ];

    displayFunctionList?: Func[];

    constructor(
        private apiSvc: ApiRequestService
    ) { }

    login(loginInfo: { userName: string, pwd: string }): Observable<{ jwt: string, user: Account }> {
        const url = API.LOGIN;

        return this.apiSvc.requestUrl(HTTP_METHOD.POST, loginInfo, url).pipe(
            map((res) => {
                if (RETCODE.SUCCESS !== res.RetCode) {
                    throw res.RetMsg;
                }
                sessionStorage.clear();
                this.user = res.RetResult.user;
                sessionStorage.setItem(COMMON.TOKEN, res.RetResult.jwt);
                sessionStorage.setItem(COMMON.FUNC, this.user?.func.filter(e => e.checked).map(e => e.label).join(',') || '');
                this.setDisplayFunc(sessionStorage.getItem(COMMON.FUNC)?.split(',') || []);
                return res.RetResult;
            })
        );
    }

    setDisplayFunc(funcList: string[]) {
        this.displayFunctionList = [];
        if (funcList.length > 0) {
            funcList.forEach(item => {
                const func = this.functionList.find(e => e.name === item);
                if (func) {
                    this.displayFunctionList?.push(func);
                }
            });
        }

    }

    getDisplatFunc(): Func[] | undefined {
        return this.displayFunctionList;
    }

}

export interface Func {
    name: string;
    imageUrl: string;
    routerPath: string;
}

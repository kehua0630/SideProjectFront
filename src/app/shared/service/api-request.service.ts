import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { from, Observable, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import {
  ALERT_MSG_TITLE,
  API,
  COMMON,
  RETCODE,
  HTTP_METHOD
} from 'src/app/shared/const/common.const';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private msg: NzMessageService
  ) { }

  /** 拿下拉選單的image */
  requestFile(url: string): Observable<Blob> {
    const httpHeaders = this.getHTTPHeaders();
    return this.http.get(environment.DEFAULT_IP + url, {
      headers: httpHeaders,
      responseType: 'blob'
    });
  }

  /** 匯出檔案 */
  downloadFileRequest(
    requestParams: any,
    url: string
  ): Observable<HttpResponse<Blob>> {
    const httpHeaders = this.getHTTPHeaders();
    return this.http
      .post(environment.DEFAULT_IP + url, requestParams, {
        headers: httpHeaders,
        observe: 'response',
        responseType: 'blob'
      })
      .pipe(filter(this.handleUserError), catchError(this.handleError));
  }

  requestUrl(
    method: string,
    requestParams: any,
    url: string
  ): Observable<any> {
    const httpHeaders = this.getHTTPHeaders();
    if (HTTP_METHOD.POST === method) {
      return this.http
        .post<any>(environment.DEFAULT_IP + url, requestParams, { headers: httpHeaders })
        .pipe(filter(this.handleUserError), catchError(this.handleError));
    } else if (HTTP_METHOD.DELETE === method) {
      return this.http
        .delete<any>(environment.DEFAULT_IP + url, { headers: httpHeaders })
        .pipe(filter(this.handleUserError), catchError(this.handleError));
    } else if (HTTP_METHOD.PUT === method) {
      return this.http
        .put<any>(environment.DEFAULT_IP + url, requestParams, { headers: httpHeaders })
        .pipe(filter(this.handleUserError), catchError(this.handleError));
    }
    else {
      return this.http
        .get<any>(environment.DEFAULT_IP + url, { headers: httpHeaders })
        .pipe(filter(this.handleUserError), catchError(this.handleError));
    }
  }

  uploadFile(file: File, url: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    // Convert the fetch Promise to an Observable
    const fetchObservable = from(
      fetch(`${environment.DEFAULT_IP}${url}`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem(COMMON.TOKEN)
        },
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error('Error occurred:', err);
          throw err;
        })
    );

    return fetchObservable;
  }

  requestNoToken(
    method: string,
    requestParams: any,
    url: string
  ): Observable<any> {
    const httpHeaders = this.getNoTokenHTTPHeaders();

    if (HTTP_METHOD.POST === method) {
      return this.http
        .post<any>(environment.DEFAULT_IP + url, requestParams, {
          headers: httpHeaders
        })
        .pipe(
          filter(this.handleNoTokenUserError),
          catchError(this.handleError)
        );
    } else {
      return this.http
        .get<any>(environment.DEFAULT_IP + url, { headers: httpHeaders })
        .pipe(
          filter(this.handleNoTokenUserError),
          catchError(this.handleError)
        );
    }
  }

  private getNoTokenHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return result;
  }

  private getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem(COMMON.TOKEN)
    });

    return result;
  }

  handleUserError = (response: any): boolean => {
    let result = true;
    // console.log(response);
    if (-10 === response.code) {
      if (sessionStorage.getItem(COMMON.TOKEN)) {
        this.msg.error(response.message);
      }
      this.router.navigateByUrl('/login');
      result = false;
    }
    return result;
  }

  handleNoTokenUserError = (response: any): boolean => {
    console.log(response);
    return true;
  }

  handleError = (error: HttpErrorResponse) => {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${JSON.stringify(error.error)}`
      );
      alert(error.error.RetMsg);
    }
    if (error.status === 401) {
      this.router.navigateByUrl('/login');
      this.msg.error(ALERT_MSG_TITLE.UNAUTHORIZED_401);
    } else
      if (
        error.status === 404
      ) {
        this.msg.error(ALERT_MSG_TITLE.DOWNLOAD_FILE_NOT_FOUND_404);
      } else
        if (error.status === 400) {
          this.msg.error(ALERT_MSG_TITLE.EXPORT_FAILED_400);
        }
    return throwError('Something bad happened; please try again later.');
  }
}

export interface IResponse<T> {
  RetCode: string;
  RetCount: number;
  RetMsg: string;
  RetResult: T;
  TotalRecords: number;
  Version: string;
}

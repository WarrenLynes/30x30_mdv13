import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {iif} from 'rxjs/internal/observable/iif';

const API_URL = 'my-30-x-30-database.herokuapp';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return of([req.url, localStorage.getItem('TOKEN')]).pipe(
      switchMap(([url, token]) =>
        iif(
          () => url.indexOf(API_URL) > -1 && !!token,
          next.handle(
            req.clone({headers: req.headers.append('Authorization', 'Bearer ' + token)})
          ),
          next.handle(req)
        )
      )
    );
  }
}

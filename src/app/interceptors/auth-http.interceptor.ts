import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

export const authInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const message = inject(NzMessageService);

  const token = localStorage.getItem('token');
  const authReq = token
    ? req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        message.warning(token 
            ? 'نشست شما منقضی شده است. لطفاً دوباره وارد شوید.'
            : 'ابتدا وارد سیستم شوید'
        );
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

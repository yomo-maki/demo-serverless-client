import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CognitoService } from '../cognito.service';

@Injectable({
  providedIn: 'root'
})
export class PostInterceptor implements HttpInterceptor {
  constructor(private cognito: CognitoService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //ðç¾å¨ã®IDãã¼ã¯ã³ãåå¾
    const authHeader = this.cognito.getCurrentUserIdToken();
    //ðãªãªã¸ãã«ã®ãªã¯ã¨ã¹ããããã¼ãè¤è£½ããIDãã¼ã¯ã³ãè¿½å ãããã®ã«å·®æ¿ã
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authHeader)
    });
    //ðå¤å½¢ãããªã¯ã¨ã¹ãã¨ãã¦éä¿¡å´ã¸æµã
    return next.handle(authReq);
  }
}

export const POST_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: PostInterceptor,
  multi: true
};
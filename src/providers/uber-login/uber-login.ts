import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {Observable} from "rxjs/Observable";

@Injectable()
export class UberLoginProvider {
  public login(): Observable<string> {
    return this.http
      .get('https://auth.uber.com/login/?next_url=https%3A%2F%2Fpartners.uber.com',
        {
          observe: 'response',
          responseType: 'text'
        })
      .map((response: HttpResponse<string>) => response.headers.get('x-csrf-token'));
  }

  public email(emailStr: string): Observable<HttpResponse<string>> {
    return this.login()
      .flatMap(csrf => {
        return this.http.post('https://auth.uber.com/login/handleanswer', {
          answer: {
            type: 'VERIFY_INPUT_USERNAME',
            userIdentifier: {
              email: emailStr
            }
          },
          init: true
        }, {
          headers: new HttpHeaders()
            .set('x-csrf-token', csrf)
            .set('Content-Type', 'application/json'),
          observe: 'response',
          responseType: 'text',
          withCredentials: true
        })
      });
  }

  constructor(private http: HttpClient) {
    console.log('Hello UberLoginProvider Provider');
  }
}

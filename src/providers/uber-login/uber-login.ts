import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {Observable} from "rxjs/Rx";

/*
  Generated class for the UberLoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UberLoginProvider {
  public login(user: string) {
    return this.http
      .get('https://auth.uber.com/login/?next_url=https%3A%2F%2Fpartners.uber.com')
      .catch(s => Observable.of(s));
  }

  constructor(private http: HttpClient) {
    console.log('Hello UberLoginProvider Provider');
  }
}

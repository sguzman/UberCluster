import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

@Injectable()
export class UberLoginProvider {
  public login() {
    return this.http
      .get('https://auth.uber.com/login/?next_url=https%3A%2F%2Fpartners.uber.com',
        {
          observe: 'response',
          responseType: 'text'
        });
  }

  constructor(private http: HttpClient) {
    console.log('Hello UberLoginProvider Provider');
  }
}

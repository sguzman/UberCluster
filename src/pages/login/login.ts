import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/mergeMap'
import {UberLoginProvider} from "../../providers/uber-login/uber-login";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UberLoginProvider]
})
export class LoginPage {
  user: string = '';
  pass: string = '';

  getLogin = new Subject();
  constructor(public uber: UberLoginProvider) {
    this.getLogin
      .flatMap(s => this.uber.email(this.user)).subscribe(
      s => console.log(s)
    )
  }

  public static ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  email() {
    this.getLogin.next();
  }

  submit() {
    this.getLogin.next(this.user);
  }
}

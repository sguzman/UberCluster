import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public uber: UberLoginProvider) {
    this.getLogin
      .flatMap((s: string) => this.uber.login(s)).subscribe(
      s => console.log(s)
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submit() {
    this.getLogin.next(this.user);
  }
}

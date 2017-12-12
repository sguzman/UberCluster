import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-uber-login',
  templateUrl: 'uber-login.html',
})
export class UberLoginPage {
  cookie: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  static ionViewDidLoad() {
    console.log('ionViewDidLoad UberLoginPage');
  }

  click() {
    console.log('click');
  }

}

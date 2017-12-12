import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {FilterTimeInterface} from "../../interface/filter-time.interface";

/**
 * Generated class for the FilterModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter-modal',
  templateUrl: 'filter-modal.html'
})
export class FilterModalComponent {
  filterTime: FilterTimeInterface;
  constructor(public params: NavParams, public viewCtrl: ViewController) {
    this.filterTime = this.params.get('filter');
    console.log(`Modal: received ${JSON.stringify(this.filterTime)}`);
    console.log('Hello FilterModalComponent Component');
  }

  dismiss() {
    this.viewCtrl.dismiss({
      filter: this.filterTime
    });
  }

}

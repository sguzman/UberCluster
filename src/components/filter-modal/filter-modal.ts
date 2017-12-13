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
    console.log('Hello FilterModalComponent Component');
  }

  deselectHoursAll() {
    for (let i = 0; i < this.filterTime.hour.length; ++i) {
      this.filterTime.hour[i] = false;
    }
  }

  selectHoursAll() {
    for (let i = 0; i < this.filterTime.hour.length; ++i) {
      this.filterTime.hour[i] = true;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({
      filter: this.filterTime
    });
  }

  public trackByIndex(index: number, item: boolean) {
    return index;
  }

}

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

  deselectDaysAll() {
    this.filterTime.dayOfWeek.sunday = false;
    this.filterTime.dayOfWeek.monday = false;
    this.filterTime.dayOfWeek.tuesday = false;
    this.filterTime.dayOfWeek.wednesday = false;
    this.filterTime.dayOfWeek.thursday = false;
    this.filterTime.dayOfWeek.friday = false;
    this.filterTime.dayOfWeek.saturday = false;
  }

  selectDaysAll() {
    this.filterTime.dayOfWeek.sunday = true;
    this.filterTime.dayOfWeek.monday = true;
    this.filterTime.dayOfWeek.tuesday = true;
    this.filterTime.dayOfWeek.wednesday = true;
    this.filterTime.dayOfWeek.thursday = true;
    this.filterTime.dayOfWeek.friday = true;
    this.filterTime.dayOfWeek.saturday = true;
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

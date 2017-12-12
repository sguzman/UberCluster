import { Component } from '@angular/core';
import {ViewController} from "ionic-angular";

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
  sunday: boolean = true;
  monday: boolean = true;
  tuesday: boolean = true;
  wednesday: boolean = true;
  thursday: boolean = true;
  friday: boolean = true;
  saturday: boolean = true;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello FilterModalComponent Component');
  }

}

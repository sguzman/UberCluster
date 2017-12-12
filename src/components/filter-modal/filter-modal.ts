import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello FilterModalComponent Component');
    this.text = 'Hello World';
  }

}

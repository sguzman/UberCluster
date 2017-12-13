import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable()
export class FilterTimeProvider {
  public filterbyTime(items: any[], filterObject: any): any[] {
    return [];
  }

  constructor() {
    console.log('Hello FilterTimeProvider Provider');
  }

}

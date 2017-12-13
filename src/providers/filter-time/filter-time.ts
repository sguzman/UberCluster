import { Injectable } from '@angular/core';

@Injectable()
export class FilterTimeProvider {
  public static filterbyTime(items: any[], filterObject: any): any[] {
    return items;
  }

  constructor() {
    console.log('Hello FilterTimeProvider Provider');
  }
}

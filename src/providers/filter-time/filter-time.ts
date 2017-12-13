import { Injectable } from '@angular/core';

import * as moment from 'moment';
import {FilterTimeInterface} from "../../interface/filter-time.interface";
import {FilterDayOfWeekInterface} from "../../interface/filter-day-of-week.interface";

@Injectable()
export class FilterTimeProvider {
  public static filterbyTime(items: any[], filterObject: FilterTimeInterface): any[] {
    const daysOfWeek = FilterTimeProvider.boolsFromDayOfWeek(filterObject.dayOfWeek);
    const days = new Map();
    for (let i = 0; i < daysOfWeek.length; ++i) {
      days.set(i, daysOfWeek[i])
    }

    const hours = new Map();
    for (let i = 0; i < filterObject.hour.length; ++i) {
      hours.set(i, filterObject.hour[i]);
    }

    return items.filter(i => {
      const mnt = moment.unix(i.requestAt);
      return days.get(mnt.day()) && hours.get(mnt.hour());
    });
  }

  public static boolsFromDayOfWeek(days: FilterDayOfWeekInterface): boolean[] {
    return [
      days.sunday,
      days.monday,
      days.tuesday,
      days.wednesday,
      days.thursday,
      days.friday,
      days.saturday,
    ];
  }

  constructor() {
    console.log('Hello FilterTimeProvider Provider');
  }
}

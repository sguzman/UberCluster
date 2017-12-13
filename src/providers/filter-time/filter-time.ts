import { Injectable } from '@angular/core';

@Injectable()
export class FilterTimeProvider {
  public static filterbyTime(items: any[], filterObject: FilterTimeInterface): any[] {
    const daysOfWeek = FilterTimeProvider.boolsFromDayOfWeek(filterObject.dayOfWeek);

    return items.filter(i => {
      const mnt = moment.unix(i.requestAt);
      return true;
    });
  }

  public static boolsFromDayOfWeek(days: FilterDayOfWeekInterface): boolean[] {
    const daysOfWeek: boolean[] = [
      days.sunday,
      days.monday,
      days.tuesday,
      days.wednesday,
      days.thursday,
      days.friday,
      days.saturday,
    ];

    return daysOfWeek;
  }

  constructor() {
    console.log('Hello FilterTimeProvider Provider');
  }
}

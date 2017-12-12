import {FilterDayOfWeekInterface} from "./filter-day-of-week.interface";

export interface FilterTimeInterface {
  dayOfWeek: FilterDayOfWeekInterface;
  hour: boolean[];
}

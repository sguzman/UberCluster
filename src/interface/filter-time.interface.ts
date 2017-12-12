import {FilterDayOfWeekInterface} from "./filter-day-of-week.interface";
import {FilterHourInterface} from "./filter-hour.interface";

export interface FilterTimeInterface {
  dayOfWeek: FilterDayOfWeekInterface;
  hour: FilterHourInterface;
}

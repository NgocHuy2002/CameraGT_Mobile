import { MomentDateService } from '@ui-kitten/moment';
import upperFirst from 'lodash/upperFirst';

class CustomDateService extends MomentDateService {
  compareDates(date1, date2) {
    const duration = super.compareDates(date1, date2);
    if (duration < 0) {
      return -1;
    } else if (duration > 0) {
      return 1;
    }
    return 0;
  }

  getDayOfWeekNames(style) {
    const dayNames = super.getDayOfWeekNames(style);
    return this.shiftDayOfWeekNames([...dayNames], this.getFirstDayOfWeek());
  }

  shiftDayOfWeekNames(value, offset) {
    return value.splice(offset).concat(value);
  }

  getMonthName(date, style) {
    const monthName = super.getMonthName(date, style);
    return upperFirst(monthName);
  }
}

const dateService = new CustomDateService('vi');

export default dateService;

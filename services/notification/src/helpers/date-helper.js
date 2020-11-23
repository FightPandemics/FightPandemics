class DateHelper {
  static addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60 * 1000);
  }

  static subtractMinutes(date, minutes) {
    return new Date(date.getTime() - minutes * 60 * 1000);
  }

  static addHours(date, hours) {
    return new Date(date.getTime() + hours * 60 * 60 * 1000);
  }

  static subtractHours(date, hours) {
    return new Date(date.getTime() - hours * 60 * 60 * 1000);
  }

  static addDays(date, days) {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }

  static subtractDays(date, days) {
    return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
  }
}

module.exports = {
  DateHelper,
};

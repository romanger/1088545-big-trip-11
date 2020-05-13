import {createElement, formatMonthDate, formatDateTime} from "../utils.js";

export const createTripDayTemplate = (date, dayNumber) => {
  const currentDayDate = date;

  const displayDate = formatMonthDate(currentDayDate);
  const metaDate = formatDateTime(currentDayDate, `no-time`);

  return (`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${metaDate}">${displayDate}</time>
      </div>

      <ul class="trip-events__list">
      </ul>
    </li>`);
};

export default class TripDay {
  constructor(date, dayNumber) {
    this._date = date;
    this._dayNumber = dayNumber;

    this._element = null;
  }

  getTemplate() {
    return createTripDayTemplate(this._date, this._dayNumber);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

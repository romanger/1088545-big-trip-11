import {formatMonthDate, formatDateTime} from "../utils.js";

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

import {createTripEventTemplate} from "./trip-event.js";
import {createTripEventEditTemplate} from "./trip-event-edit.js";
import {formatMonthDate, formatDateTime} from "../utils.js";
import {generateEventTypes} from "../mock/event-type.js";

export const createTripDayTemplate = (events, day) => {
  const eventTypes = generateEventTypes();
  const currentDayDate = new Date(events[0].startDateTime);

  let dayEventEdit = ``;
  let dayEvents = ``;

  if (day === 1) {
    dayEventEdit = createTripEventEditTemplate(events[0], eventTypes);
    dayEvents = events.slice(1).map(createTripEventTemplate).join(`\n`);
  } else {
    dayEvents = events.map(createTripEventTemplate).join(`\n`);
  }

  const displayDate = formatMonthDate(currentDayDate);
  const metaDate = formatDateTime(currentDayDate, `no-time`);

  return (`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${day}</span>
        <time class="day__date" datetime="${metaDate}">${displayDate}</time>
      </div>

      <ul class="trip-events__list">
        ${dayEventEdit}
        ${dayEvents}
      </ul>
    </li>`);
};

import {filterEventsByDate} from "./utils.js";
import {createTripInformationWrapperTemplate} from "./components/trip-information-wrapper.js";
import {createTripInformationTemplate} from "./components/trip-information.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterMenuTemplate} from "./components/filter-menu.js";
import {createSortMenuTemplate} from "./components/sort-menu.js";
import {createTripEventsWrapperTemplate} from "./components/trip-events-wrapper.js";
import {createTripDayTemplate} from "./components/trip-day.js";
import {createTripEventTemplate} from "./components/trip-event.js";
import {createTripEventEditTemplate} from "./components/trip-event-edit.js";

import {generateEventTypes} from "./mock/event-type.js";
import {generateTripEvents} from "./mock/trip-event.js";

const EVENTS_COUNT = 20;

const eventTypes = generateEventTypes();
const events = generateTripEvents(EVENTS_COUNT, eventTypes);

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

render(tripMainElement, createTripInformationWrapperTemplate(), `afterbegin`);

const tripInfoWrapperElement = pageBodyElement.querySelector(`.trip-info`);
render(tripInfoWrapperElement, createTripInformationTemplate());
render(tripInfoWrapperElement, createTripCostTemplate());

const tripControlWrapperElement = pageBodyElement.querySelector(`.trip-controls`);
const tripMenuTitleElement = tripControlWrapperElement.querySelector(`h2:first-child`);
render(tripMenuTitleElement, createMenuTemplate(), `afterend`);
render(tripControlWrapperElement, createFilterMenuTemplate());

const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);
render(tripEventsElement, createSortMenuTemplate());
render(tripEventsElement, createTripEventsWrapperTemplate());

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);
const filteredEvents = filterEventsByDate(events);

let allDates = Array.from(filteredEvents, (it) => it.startDateTime.toDateString());
let days = [...new Set(allDates)]

let dayCount = 1;
for (let day of days) {
  day = new Date(day);
  render(tripDaysElement, createTripDayTemplate(day, dayCount++));
  let events = tripDaysElement.querySelectorAll(`.trip-events__list`);
  let dateEvents = filteredEvents.slice().filter((event) => event.startDateTime.toDateString() === day.toDateString());

  dateEvents.map((dateEvent, i) => {
    if (i === 0 && dayCount === 2) {
      render(events[dayCount - 2], createTripEventEditTemplate(dateEvent, eventTypes));
    } else {
      render(events[dayCount - 2], createTripEventTemplate(dateEvent));
    }
  });
};

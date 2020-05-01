import {createTripInformationWrapperTemplate} from "./components/trip-information-wrapper.js";
import {createTripInformationTemplate} from "./components/trip-information.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterMenuTemplate} from "./components/filter-menu.js";
import {createSortMenuTemplate} from "./components/sort-menu.js";
import {createTripEventsWrapperTemplate} from "./components/trip-events-wrapper.js";
import {createTripDayTemplate} from "./components/trip-day.js";

import {generateEventTypes} from "./mock/event-type.js";
import {generateTripEvents} from "./mock/trip-event.js";

const EVENTS_COUNT = 20;
let dayCount = 1;

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
const filteredEvents = events.slice().sort((a, b) => {
  return a.startDateTime - b.startDateTime;
});


filteredEvents.reduce((day, it, i, arr) => {
  let currentDate = it.startDateTime.getDate();
  let nextDate = arr[i + 1] ? arr[i + 1].startDateTime.getDate() : null;

  if(currentDate == nextDate) {
    day.push(it);
  } else {
    day.push(it);
    render(tripDaysElement, createTripDayTemplate(day, dayCount), `beforeend`);
    dayCount++;
    day = [];
  }
  return day;
}, []);

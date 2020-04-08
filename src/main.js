import {createTripInformationWrapperTemplate} from "./components/trip-information-wrapper.js";
import {createTripInformationTemplate} from "./components/trip-information.js";
import {createTripCostTemplate} from "./components/trip-cost.js";
import {createMenuTemplate} from "./components/menu.js";
import {createFilterMenuTemplate} from "./components/filter-menu.js";
import {createSortMenuTemplate} from "./components/sort-menu.js";
import {createAddEventFormTemplate} from "./components/add-event-form.js";
import {createTripEventsWrapperTemplate} from "./components/trip-events-wrapper.js";
import {createTripDayTemplate} from "./components/trip-day.js";

const TRIP_DAYS_COUNT = 3;

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderDays = (container, template) => {
  for (let i = 0; i < TRIP_DAYS_COUNT; i++) {
    render(container, template());
  }
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
render(tripEventsElement, createAddEventFormTemplate());
render(tripEventsElement, createTripEventsWrapperTemplate());

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);
renderDays(tripDaysElement, createTripDayTemplate);

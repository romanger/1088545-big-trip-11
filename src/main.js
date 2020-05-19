import TripInformationWrapperComponent from "./components/trip-information-wrapper.js";
import TripInformationComponent from "./components/trip-information.js";
import TripCostComponent from "./components/trip-cost.js";
import MenuComponent from "./components/menu.js";
import FilterMenuComponent from "./components/filter-menu.js";

import TripController from "./controllers/trip-controller.js";
import {render, RenderPosition } from "./utils/render.js";

import {generateEventTypes} from "./mock/event-type.js";
import {generateTripEvents} from "./mock/trip-event.js";

const EVENTS_COUNT = 20;

const eventTypes = generateEventTypes();
const events = generateTripEvents(EVENTS_COUNT, eventTypes);

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);
const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

render(tripMainElement, new TripInformationWrapperComponent(), RenderPosition.AFTERBEGIN);

const tripInfoWrapperElement = pageBodyElement.querySelector(`.trip-info`);
render(tripInfoWrapperElement, new TripInformationComponent(), RenderPosition.BEFOREEND);
render(tripInfoWrapperElement, new TripCostComponent(), RenderPosition.BEFOREEND);

const tripControlWrapperElement = pageBodyElement.querySelector(`.trip-controls`);
const tripMenuTitleElement = tripControlWrapperElement.querySelector(`h2:first-child`);
render(tripMenuTitleElement, new MenuComponent(), RenderPosition.AFTERBEGIN);
render(tripControlWrapperElement, new FilterMenuComponent(), RenderPosition.BEFOREEND);

const tripController = new TripController(tripEventsElement);
tripController.render(events);

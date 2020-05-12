import TripInformationWrapperComponent from "./components/trip-information-wrapper.js";
import TripInformationComponent from "./components/trip-information.js";
import TripCostComponent from "./components/trip-cost.js";
import MenuComponent from "./components/menu.js";
import FilterMenuComponent from "./components/filter-menu.js";
import SortMenuComponent from "./components/sort-menu.js";
import TripEventsWrapperComponent from "./components/trip-events-wrapper.js";
import TripDayComponent from "./components/trip-day.js";
import TripEventComponent from "./components/trip-event.js";
import TripEventEditComponent from "./components/trip-event-edit.js";
import { filterEventsByDate, render, RenderPosition } from "./utils.js";

import { generateEventTypes } from "./mock/event-type.js";
import { generateTripEvents } from "./mock/trip-event.js";

const EVENTS_COUNT = 20;

const eventTypes = generateEventTypes();
const events = generateTripEvents(EVENTS_COUNT, eventTypes);

const renderTripEvent = (tripEventDayElement, tripEvent) => {
  const onEditButtonClick = () => {
    tripEventDayElement.replaceChild(tripEventEditComponent.getElement(), tripEventComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    tripEventDayElement.replaceChild(tripEventComponent.getElement(), tripEventEditComponent.getElement());
  };

  const tripEventComponent = new TripEventComponent(tripEvent);
  const editButton = tripEventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, onEditButtonClick);

  const tripEventEditComponent = new TripEventEditComponent(tripEvent, eventTypes);
  const editForm = tripEventEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(tripEventDayElement, tripEventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripDays = (boardComponent, tripEvents) => {
  const filteredEvents = filterEventsByDate(tripEvents);

  let allDates = Array.from(filteredEvents, (it) => it.startDateTime.toDateString());
  let days = [...new Set(allDates)];

  let dayCount = 1;
  for (let day of days) {
    day = new Date(day);
    render(boardComponent.getElement(), new TripDayComponent(day, dayCount++).getElement(), RenderPosition.BEFOREEND);

    let dayEventsList = boardComponent.getElement().querySelectorAll(`.trip-events__list`);
    let dateEvents = filteredEvents.slice().filter((event) => event.startDateTime.toDateString() === day.toDateString());

    dateEvents.map((dateEvent) => {
      renderTripEvent(dayEventsList[dayCount - 2], dateEvent);
    });
  }
};

const renderTripBoard = (boardComponent, tripEvents) => {

  const tripEventsElement = pageBodyElement.querySelector(`.trip-events`);

  render(tripEventsElement, new SortMenuComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

  renderTripDays(boardComponent, tripEvents);
};

const pageBodyElement = document.querySelector(`.page-body`);
const tripMainElement = pageBodyElement.querySelector(`.trip-main`);

render(tripMainElement, new TripInformationWrapperComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripInfoWrapperElement = pageBodyElement.querySelector(`.trip-info`);
render(tripInfoWrapperElement, new TripInformationComponent().getElement(), RenderPosition.BEFOREEND);
render(tripInfoWrapperElement, new TripCostComponent().getElement(), RenderPosition.BEFOREEND);

const tripControlWrapperElement = pageBodyElement.querySelector(`.trip-controls`);
const tripMenuTitleElement = tripControlWrapperElement.querySelector(`h2:first-child`);
render(tripMenuTitleElement, new MenuComponent().getElement(), RenderPosition.AFTERBEGIN);
render(tripControlWrapperElement, new FilterMenuComponent().getElement(), RenderPosition.BEFOREEND);

renderTripBoard(new TripEventsWrapperComponent, events);

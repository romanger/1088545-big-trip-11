import TripDayComponent from "../components/trip-day.js";
import TripEventComponent from "../components/trip-event.js";
import TripEventEditComponent from "../components/trip-event-edit.js";
import SortMenuComponent from "../components/sort-menu.js";
import NoEventsComponent from "../components/no-events.js";
import TripEventsWrapperComponent from "../components/trip-events-wrapper.js";
import {filterEventsByDate} from "../utils/common.js";
import {render, replace, RenderPosition} from "../utils/render.js";

import {generateEventTypes} from "../mock/event-type.js";
const eventTypes = generateEventTypes();

const renderTripEvent = (tripEventDayElement, tripEvent) => {
  const replaceEventToEdit = () => {
    replace(tripEventEditComponent, tripEventComponent);
  };

  const replaceEditToEvent = () => {
    replace(tripEventComponent, tripEventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const tripEventComponent = new TripEventComponent(tripEvent);

  tripEventComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const tripEventEditComponent = new TripEventEditComponent(tripEvent, eventTypes);
  tripEventEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventDayElement, tripEventComponent, RenderPosition.BEFOREEND);
};

const renderTripDays = (boardComponent, tripEvents) => {
  const filteredEvents = filterEventsByDate(tripEvents);

  let allDates = Array.from(filteredEvents, (it) => it.startDateTime.toDateString());
  let days = [...new Set(allDates)];

  let dayCount = 1;
  for (let day of days) {
    day = new Date(day);
    render(boardComponent.getElement(), new TripDayComponent(day, dayCount++), RenderPosition.BEFOREEND);

    let dayEventsList = boardComponent.getElement().querySelectorAll(`.trip-events__list`);
    let dateEvents = filteredEvents.slice().filter((event) => event.startDateTime.toDateString() === day.toDateString());

    dateEvents.map((dateEvent) => {
      renderTripEvent(dayEventsList[dayCount - 2], dateEvent);
    });
  }
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._sortMenuComponent = new SortMenuComponent();
    this._tripEventsWrapperComponent = new TripEventsWrapperComponent();
  }

  render(events) {

    if (events.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortMenuComponent, RenderPosition.BEFOREEND);
    render(this._container, this._tripEventsWrapperComponent, RenderPosition.BEFOREEND);
    renderTripDays(this._tripEventsWrapperComponent, events);
  }
}

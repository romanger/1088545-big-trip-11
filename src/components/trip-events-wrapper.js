import AbstractComponent from "./abstract-component.js";

const createTripEventsWrapperTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};

export default class TripEventsWrapper extends AbstractComponent {
  getTemplate() {
    return createTripEventsWrapperTemplate();
  }
}

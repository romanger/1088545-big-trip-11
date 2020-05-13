import {createElement} from "../utils.js";

const createTripEventsWrapperTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};

export default class TripEventsWrapper {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripEventsWrapperTemplate();
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

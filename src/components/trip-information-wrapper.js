import AbstractComponent from "./abstract-component.js";

const createTripInformationWrapperTemplate = () => {
  return (`<section class="trip-main__trip-info  trip-info"></section>`);
};

export default class TripInformationWrapper extends AbstractComponent {
  getTemplate() {
    return createTripInformationWrapperTemplate();
  }
}

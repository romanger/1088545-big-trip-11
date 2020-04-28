import {formatTime, formatDateTime, getHourDifference} from "../utils.js";

export const createTripEventTemplate = (tripEvent) => {

  const {cost, endDateTime, location, offers, startDateTime, type} = tripEvent;

  const startTime = formatTime(startDateTime);
  const endTime = formatTime(endDateTime);
  const startDateTimeFormat = formatDateTime(startDateTime);
  const endDateTimeFormat = formatDateTime(endDateTime);
  const timeDiff = getHourDifference(endDateTime, startDateTime);

  let titleConnecter = `to`;
  if (type.type === `sight`) {
    titleConnecter = `in`;
  }

  const createOffersTemplate = (offersList) => {
    let template = ``;
    if (offersList.length !== 0) {

      for (let i = 0; i < 2; i++) {
        if (!offersList[i]) {
          return template;
        }
        template += `<li class="event__offer">
          <span class="event__offer-title">${offersList[i].description}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offersList[i].cost}</span>
         </li>`;
      }
    }
    return template;
  };

  return (`<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type.name} ${titleConnecter} ${location}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateTimeFormat}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDateTimeFormat}">${endTime}</time>
        </p>
        <p class="event__duration">${timeDiff}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${cost}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffersTemplate(offers)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

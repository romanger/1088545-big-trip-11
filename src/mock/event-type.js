import {getRandomArrayItem, getRandomIntegerNumber, getId} from "../utils.js";
import {eventTypeNames, offers} from "./data.js";

const generateOffer = () => {
  const offerDescription = getRandomArrayItem(offers);
  const offerId = getId(offerDescription);
  const offerEvent = getRandomArrayItem(eventTypeNames).name;

  return {
    id: offerId,
    description: offerDescription,
    event: offerEvent,
    cost: getRandomIntegerNumber(10, 100),
  };
};

const generateOffers = () => {
  const count = getRandomIntegerNumber(0, 20);
  return new Array(count)
    .fill(``)
    .map(generateOffer);
};

const offersList = generateOffers();

const generateEventType = (eventType) => {
  const offersForEvent = offersList.filter((it) => it.event === eventType.name);

  return {
    name: eventType.name,
    offers: offersForEvent,
  };
};

export const generateEventTypes = () => {
  return eventTypeNames.map(generateEventType);
};

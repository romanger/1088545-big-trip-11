import {getRandomArrayItem, getRandomIntegerNumber, getRandomArrayItems} from "../utils.js";
import {eventTypeNames, locations} from "./data.js";

const getRandomStartEvent = () => {
  const startDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(1, 8);

  startDate.setDate(startDate.getDate() + diffValue);

  return startDate;
};

const getRandomEndEvent = (startEventDate) => {
  const endDate = new Date(startEventDate);
  const diffValue = getRandomIntegerNumber(1, 12);
  endDate.setHours(startEventDate.getHours() + diffValue);

  return endDate;
};

const generateTripEvent = (eventTypes) => {
  const startDate = getRandomStartEvent();
  const endDate = getRandomEndEvent(startDate);
  const eventType = getRandomArrayItem(eventTypeNames);
  const allEventTypeOffers = eventTypes.find((element) => {
    return element.name === eventType.name;
  });
  const eventOffers = getRandomArrayItems(allEventTypeOffers.offers);

  return {
    type: eventType,
    location: getRandomArrayItem(locations),
    startDateTime: startDate,
    endDateTime: endDate,
    cost: getRandomIntegerNumber(10, 1000),
    offers: eventOffers,
    isFeatured: Math.random() > 0.5,
  };
};


const generateTripEvents = (count, eventTypes) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      return generateTripEvent(eventTypes);
    });
};

export {generateTripEvent, generateTripEvents};

import {getRandomArrayItem, getRandomIntegerNumber, shuffle} from "../utils.js";
import {eventTypeNames, locations} from "./data.js";

const getRandomStartEndEvent = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  const eventStart = targetDate.setDate(targetDate.getDate() + diffValue);
  const eventEnd = targetDate.setHours(targetDate.getHours() + getRandomIntegerNumber(1, 24));

  return [eventStart, eventEnd];
};

const generateTripEvent = (eventTypes) => {
  const [startDate, endDate] = getRandomStartEndEvent();
  const eventType = getRandomArrayItem(eventTypeNames);
  const allEventTypeOffers = eventTypes.find((element) => {
    return element.name === eventType;
  });
  let checkedOffers = [];

  let offersIndexes = allEventTypeOffers.offers.map((it, i) => {
    return i;
  });

  if (offersIndexes) {
    checkedOffers = shuffle(offersIndexes).slice(getRandomIntegerNumber(0, offersIndexes.length)).sort();
  }

  return {
    type: eventType,
    location: getRandomArrayItem(locations),
    startDateTime: startDate,
    endDateTime: endDate,
    cost: getRandomIntegerNumber(10, 1000),
    offers: checkedOffers,
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

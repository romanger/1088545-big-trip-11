import {getRandomArrayItem, getRandomIntegerNumber} from "../utils/common.js";
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

export const generateTripEvent = () => {
  const startDate = getRandomStartEvent();
  const endDate = getRandomEndEvent(startDate);
  const eventType = getRandomArrayItem(eventTypeNames);

  return {
    type: eventType,
    location: getRandomArrayItem(locations),
    startDateTime: startDate,
    endDateTime: endDate,
    cost: getRandomIntegerNumber(10, 1000),
    offers: [],
    isFeatured: Math.random() > 0.5,
  };
};


export const generateTripEvents = (count, eventTypes) => {
  return new Array(count)
    .fill(``)
    .map(() => {
      return generateTripEvent(eventTypes);
    });
};

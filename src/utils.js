import {MONTH_NAMES} from "./const.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const getRandomArrayItems = (array) => {
  const shaffleArray = array.sort(() => Math.random() - 0.5);
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return shaffleArray.slice(0, randomIndex);
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 24);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDateTime = (date, format = `date-time`) => {
  let year = date.getFullYear();
  const month = castTimeFormat(date.getMonth());
  const day = castTimeFormat(date.getDay());
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  switch (format) {
    case `form`:
      year = date.getYear().toString().slice(1);
      return `${day}/${month}/${year} ${hours}:${minutes}`;
      break;
    case `no-time`:
      return `${year}-${month}-${day}`;
      break;
    default:
      return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
};

export const getHourDifference = (endDate, startDate) => {
  const difference = Math.floor(((endDate - startDate) / 1000) / 60);
  const hours = Math.floor(difference / 60);
  const minutes = Math.floor(difference % 60);

  return `${hours}H ${minutes}M`;
};

export const formatMonthDate = (date) => {
  const month = MONTH_NAMES[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
};

export const getId = (str) => {
  const id = str.split(` `).join(`-`).toLowerCase();
  return id;
};

export const filterEventsByDate = (events) => {
  return events.slice().sort((a, b) => {
    return a.startDateTime - b.startDateTime;
  });
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

import { getRandomArrayItem, getRandomIntegerNumber } from "../utils.js";
import { eventTypeNames, offers } from "./data.js";

const generateOffer = () => {
    return {
        description: getRandomArrayItem(offers),
        cost: getRandomIntegerNumber(10, 100),
    }
};

const generateOffers = () => {
    const count = getRandomIntegerNumber(0, 5);
    return new Array(count)
        .fill(``)
        .map(generateOffer);
};

const generateEventType = (eventType) => {
    const offers = generateOffers();
    return {
        name: eventType,
        offers: offers,
    }
};

export const generateEventTypes = () => {
    return eventTypeNames.map(generateEventType);
};
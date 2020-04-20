import {getRandomIntegerNumber} from "../utils.js";
import { locations, description } from "./data.js";

const generateLocation = (location) => {
    const locationDescription = description.split(`.`);
    const count = getRandomIntegerNumber(0,5);
    const imagesArray = new Array(count).fill(``).map(()=>{
        return `http://picsum.photos/248/152?r=${Math.random()}`;
    });

    return {
        name: location,
        description: locationDescription.slice(0, getRandomIntegerNumber(1,5)).join('.'),
        images: imagesArray
    }
};

export const generateLocations = () => {
    return locations.map(generateLocation);
};

const eventTypeNames = [
  {name: `Taxi`, type: `transport`},
  {name: `Bus`, type: `transport`},
  {name: `Train`, type: `transport`},
  {name: `Ship`, type: `transport`},
  {name: `Transport`, type: `transport`},
  {name: `Drive`, type: `transport`},
  {name: `Flight`, type: `transport`},
  {name: `Check-in`, type: `sight`},
  {name: `Sightseeing`, type: `sight`},
  {name: `Restaurant`, type: `sight`}];
const offers = [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`, `Rent a car`, `Order Uber`, `Add breakfast`];
const locations = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

export {eventTypeNames, offers, locations, descriptions};

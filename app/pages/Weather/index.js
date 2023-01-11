import { cities } from './cities';

/*** Sort cities list ***/
export const sortedCities = cities.sort((firstItem, secondItem) =>
  firstItem.name.localeCompare(secondItem.name)
);

/*** Fetch city weather ***/
const apiKey = '641c47dcb8a7b9d976c1925431f690f7';
const apiDomain = 'http://api.openweathermap.org/data/2.5';
export const weatherIconUrl = 'http://openweathermap.org/img';
export const fetchWeather = async (cityId) => {
  const apiRequest = `${apiDomain}/weather?id=${cityId}&appid=${apiKey}&units=metric`;
  const data = await fetch(apiRequest);

  return await data.json();
};

/*** Convert received time data ***/
export const getTime = (secondsValue) => {
  let time = new Date();

  if (secondsValue) {
    time = new Date(secondsValue * 1000);
  }

  return time.toLocaleTimeString().slice(0, -3);
};

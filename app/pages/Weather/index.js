import { cities } from './cities';

/*** Sort cities list ***/
export const sortedCities = cities.sort((firstItem, secondItem) =>
  firstItem.name.localeCompare(secondItem.name)
);

/*** Fetch city weather ***/
const apiKey = '641c47dcb8a7b9d976c1925431f690f7';
const apiDomain = 'https://api.openweathermap.org/data/2.5';
export const weatherIconUrl = 'http://openweathermap.org/img';

export const fetchWeather = async (cityId) => {
  const apiRequest = `${apiDomain}/weather?id=${cityId}&appid=${apiKey}&units=metric`;
  const data = await fetch(apiRequest);

  return await data.json();
};

export const fetchLocationWeather = async (lat, lon) => {
  const apiLocationRequest = `${apiDomain}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const data = await fetch(apiLocationRequest);

  return await data.json();
};

/*** Fetch current location weather ***/
export const chooseMyCity = async () => {
  const geolocationResult = await new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // Return object with location coordinates
        const coord = {
          lat: coords.latitude,
          lon: coords.longitude,
        };

        resolve(coord);
      },
      ({ message }) => {
        // Return array with false for manage state and error message
        resolve([false, message]);
      },
      { enableHighAccuracy: true }
    );
  });

  // Return error message if location is disabled
  if (Array.isArray(geolocationResult) && !geolocationResult[0]) {
    return geolocationResult;
  }

  // Return coordinates and location id if location is enabled
  const locationCityWeather = await fetchLocationWeather(
    geolocationResult.lat,
    geolocationResult.lon
  );

  return [locationCityWeather.id, geolocationResult];
};

/*** Convert received time data ***/
export const getTime = (secondsValue) => {
  let time = new Date();

  if (secondsValue) {
    time = new Date(secondsValue * 1000);
  }

  return time.toLocaleTimeString().slice(0, -3);
};

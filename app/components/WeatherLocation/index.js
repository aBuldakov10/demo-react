import { fetchLocationWeather } from './api';

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

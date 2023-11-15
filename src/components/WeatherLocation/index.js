import { fetchLocationWeather } from './api';

/*** Fetch current location weather ***/
export const chooseMyCity = async (lang) => {
  const geolocationResult = await new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // Return object with location coordinates
        const coord = {
          lat: coords.latitude,
          lon: coords.longitude,
          lng: lang,
        };

        resolve(coord);
      },
      ({ message }) => {
        // Return object with false for manage state and error message
        resolve({
          enabledInBrowser: false,
          errorMessage: message,
        });
      },
      { enableHighAccuracy: true }
    );
  });

  // Return error message if location is disabled
  if (geolocationResult.enabledInBrowser === false) {
    return geolocationResult;
  }

  // Return coordinates and location id if location is enabled
  const locationCityWeather = await fetchLocationWeather(geolocationResult);

  return {
    id: locationCityWeather.id,
    coordinates: geolocationResult,
    weatherInfo: locationCityWeather,
  };
};

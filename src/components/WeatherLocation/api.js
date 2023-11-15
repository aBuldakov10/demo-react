// Import weather domain and unique api key
import { apiDomain, apiKey } from '../../pages/Weather/api';

/*** Fetch location weather ***/
export const fetchLocationWeather = async ({ lat, lon, lng }) => {
  const apiLocationRequest = `${apiDomain}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${lng}&units=metric`;
  const data = await fetch(apiLocationRequest);

  return await data.json();
};

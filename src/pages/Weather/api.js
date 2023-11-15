/*** Weather api variables ***/
export const apiKey = '641c47dcb8a7b9d976c1925431f690f7';
export const apiDomain = 'https://api.openweathermap.org/data/2.5';
export const weatherIconUrl = 'http://openweathermap.org/img';

/*** Get weather data by city id ***/
export const fetchWeather = async (cityId, lng) => {
  const apiRequest = `${apiDomain}/weather?id=${cityId}&appid=${apiKey}&lang=${lng}&units=metric`;
  const data = await fetch(apiRequest);

  return await data.json();
};

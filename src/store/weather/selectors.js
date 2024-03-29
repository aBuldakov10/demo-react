export const weatherLoader = ({ weather }) => {
  return weather.weatherInfo.loader;
};

export const activeCitySelector = ({ weather }) => {
  return {
    activeCityId: weather.cityList.activeCityId,
    activeCityIndex: weather.cityList.activeCityIndex,
  };
};

export const cityWeatherSelector = ({ weather }) => {
  return weather.weatherInfo.info;
};

export const locationDataSelector = ({ weather }) => {
  return weather.location;
};

export const cityCoordSelector = ({ weather }) => {
  return {
    coord: weather.weatherInfo.info.coord,
    name: weather.weatherInfo.info.name,
  };
};

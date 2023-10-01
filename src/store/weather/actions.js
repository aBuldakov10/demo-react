import {
  GET_WEATHER_CITY,
  GET_WEATHER_LOCATION,
  LOADED,
  LOADING,
  LOCATION_DISABLED,
  SELECT_CITY,
} from './types';

// Loader weather info actions
export const weatherLoading = () => {
  return {
    type: LOADING,
    state: true,
  };
};

export const weatherLoaded = () => {
  return {
    type: LOADED,
    state: false,
  };
};

// Select city from city list
export const selectCity = (activeCityId, activeCityIndex) => {
  return {
    type: SELECT_CITY,
    activeCityId,
    activeCityIndex,
  };
};

// Get weather info
export const getWeatherCity = (weather) => {
  return {
    type: GET_WEATHER_CITY,
    weather,
  };
};

// Get weather location
export const getWeatherLocation = ({ id, coordinates, weatherInfo }) => {
  return {
    type: GET_WEATHER_LOCATION,
    id,
    coordinates,
    weatherInfo,
  };
};

export const disabledLocation = (errorMessage) => {
  return {
    type: LOCATION_DISABLED,
    errorMessage,
  };
};

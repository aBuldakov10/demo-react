import {
  GET_WEATHER_CITY,
  GET_WEATHER_LOCATION,
  LOADED,
  LOADING,
  LOCATION_DISABLED,
  SELECT_CITY,
} from './types';

const initialWeatherState = {
  weatherInfo: {
    loader: true,
    info: {},
  },
  cityList: {
    activeCityId: 524894,
    activeCityIndex: null,
  },
  location: {
    isLocation: false,
    coordinates: {
      lat: '',
      lon: '',
    },
    errorMessage: '',
    enabledInBrowser: true,
  },
};

export const weatherReducer = (state = initialWeatherState, action) => {
  if (action.type === LOADING) {
    return {
      ...state,
      weatherInfo: {
        ...state.weatherInfo,
        loader: action.state,
      },
    };
  }

  if (action.type === LOADED) {
    return {
      ...state,
      weatherInfo: {
        ...state.weatherInfo,
        loader: action.state,
      },
    };
  }

  if (action.type === SELECT_CITY) {
    return {
      ...state,
      cityList: {
        activeCityId: action.activeCityId,
        activeCityIndex: action.activeCityIndex,
      },
    };
  }

  if (action.type === GET_WEATHER_CITY) {
    return {
      ...state,
      weatherInfo: {
        ...state.weatherInfo,
        info: { ...action.weather },
      },
      location: {
        ...state.location,
        isLocation: false,
      },
    };
  }

  if (action.type === GET_WEATHER_LOCATION) {
    return {
      ...state,
      cityList: {
        ...state.cityList,
        activeCityIndex: null,
      },
      weatherInfo: {
        ...state.weatherInfo,
        info: { ...action.weatherInfo },
      },
      location: {
        ...state.location,
        isLocation: true,
        coordinates: { ...action.coordinates },
        errorMessage: '',
        enabledInBrowser: true,
      },
    };
  }

  if (action.type === LOCATION_DISABLED) {
    return {
      ...state,
      location: {
        ...state.location,
        isLocation: true,
        errorMessage: action.errorMessage,
        enabledInBrowser: false,
      },
    };
  }

  return state;
};

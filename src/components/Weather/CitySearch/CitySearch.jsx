import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Box, TextField, List, ListItem } from '@mui/material';
import { Search } from '@mui/icons-material';
// Hook
import useClickOutside from '../../../hooks/useClickOutside';
// Store
import { getWeatherCity, weatherLoaded, weatherLoading } from '../../../store/weather/actions';
// Files
import { fetchWeather } from './api';
import { fetchLocations } from './api';
import './CitySearch.scss';

const CitySearch = () => {
  const searchRef = useRef(null);
  const locationsDataRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { handleSubmit, control, reset } = useForm();

  const [locationsData, setLocationsData] = useState([]); // geolocation list

  const callback = () => setLocationsData([]);

  useClickOutside(locationsDataRef, callback);

  /*** Handlers ***/
  const handleSearch = async ({ searchCity }) => {
    searchCity && (await fetchLocations(searchCity).then((data) => setLocationsData(data)));
  };
  const handleSearchIcon = () => {
    const searchCityValue = searchRef.current.querySelector('input').value;

    handleSearch({ searchCity: searchCityValue });
  };
  const handleChooseLocation = async (lat, lon) => {
    dispatch(weatherLoading());

    const weatherData = await fetchWeather(lat, lon);

    dispatch(getWeatherCity(weatherData));
    dispatch(weatherLoaded());

    reset({ searchCity: '' }); // очистить поле поиска
    setLocationsData([]);
  };

  return (
    <Box sx={{ mb: 2, position: 'relative' }}>
      <form className="form search-city" onSubmit={handleSubmit(handleSearch)}>
        <div className="form__group">
          <Controller
            control={control}
            defaultValue={''}
            name="searchCity"
            render={({ field }) => (
              <>
                <TextField
                  id="searchCity"
                  {...field}
                  ref={searchRef}
                  label={t('weather.search.label')}
                  placeholder={t('weather.search.placeholder')}
                  variant="outlined"
                  fullWidth
                />
              </>
            )}
          />

          <div className="weather-search-btn" onClick={handleSearchIcon}>
            <Search />
          </div>
        </div>
      </form>

      {/*** Geolocation list ***/}
      {locationsData.length > 0 && (
        <List className="location-list" ref={locationsDataRef}>
          {locationsData.map(({ country, state, name, lat, lon }, index) => {
            return (
              <ListItem className="location-list__item" key={index} onClick={() => handleChooseLocation(lat, lon)}>
                {country}, {state && `${state},`} {name}
              </ListItem>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default CitySearch;

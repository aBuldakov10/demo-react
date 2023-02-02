import React, { useContext } from 'react';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { sortedCities } from './index';
import { WeatherCityList } from '../../pages/Weather/Weather'; // Import context

const CityList = () => {
  const { cityActive, setCityActive, setCityId, setIsLocation } =
    useContext(WeatherCityList);

  return (
    <List
      className="weather__list"
      sx={{
        py: 2,
        borderRadius: 1,
        bgcolor: '#fff',
        boxShadow: '0px 2px 5px 0px #d2d2d2;',
        overflow: 'hidden',
      }}
    >
      {sortedCities.map(({ id, name, country }, index) => {
        return (
          <ListItem disablePadding key={id}>
            <ListItemButton
              selected={cityActive === index} // Use index as selected city identify
              data-city-id={id}
              sx={{ px: 3 }}
              onClick={() => {
                setIsLocation(false); // Set if not location weather
                setCityId(id); // Get weather data
                setCityActive(index); // Change active city
              }}
            >
              <ListItemText primary={`${name} (${country})`} sx={{ my: 0 }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CityList;

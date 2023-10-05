import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// Files
import './CityList.scss';
import { sortedCities } from './index';

// Store
import { selectCity, weatherLoading } from '../../../store/weather/actions';
import { activeCitySelector } from '../../../store/weather/selectors';

const CityList = () => {
  const dispatch = useDispatch();
  const { activeCityId, activeCityIndex } = useSelector(activeCitySelector);

  return (
    <List className="weather-list">
      {sortedCities.map(({ id, name, country }, index) => {
        return (
          <ListItem disablePadding key={id}>
            <ListItemButton
              selected={activeCityIndex === index} // Use index as selected city identify
              data-city-id={id}
              sx={{ px: 3 }}
              onClick={() => {
                // Avoid bug after click on selected city
                if (id === activeCityId) {
                  return false;
                }

                dispatch(weatherLoading());
                dispatch(selectCity(id, index));
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

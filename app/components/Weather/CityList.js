import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// Files
import { sortedCities } from './index';

// Store
import { selectCity, weatherLoading } from '../../store/weather/actions';
import { activeCitySelector } from '../../store/weather/selectors';

const CityList = () => {
  const dispatch = useDispatch();
  const { activeCityId, activeCityIndex } = useSelector(activeCitySelector);

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

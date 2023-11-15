import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

// Files
import './CityList.scss';
import { cities } from './cities';

// Store
import { selectCity, weatherLoading } from '../../../store/weather/actions';
import { activeCitySelector } from '../../../store/weather/selectors';

const CityList = () => {
  const { lng } = useParams();
  const dispatch = useDispatch();
  const { activeCityId, activeCityIndex } = useSelector(activeCitySelector);

  const sortedCities = cities.sort((firstItem, secondItem) => {
    return lng === 'en'
      ? firstItem.nameEn.localeCompare(secondItem.nameEn)
      : firstItem.nameRu.localeCompare(secondItem.nameRu);
  });

  return (
    <List className="weather-list">
      {sortedCities.map(({ id, nameRu, nameEn, country }, index) => {
        return (
          <ListItem disablePadding key={id}>
            <ListItemButton
              selected={activeCityIndex === index} // Use index as selected city identify
              data-city-id={id}
              sx={{ px: 3 }}
              onClick={() => {
                // Avoid bug after click on selected city
                if (id === activeCityId) return;

                dispatch(weatherLoading());
                dispatch(selectCity(id, index));
              }}
            >
              <ListItemText primary={`${lng === 'ru' ? nameRu : nameEn} (${country})`} sx={{ my: 0 }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CityList;

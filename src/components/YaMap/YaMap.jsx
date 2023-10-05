import React from 'react';
import { useSelector } from 'react-redux';
import { YMaps, Map, Placemark, TypeSelector } from '@pbe/react-yandex-maps';

// Files
import './YaMap.scss';

// Store
import { cityCoordSelector } from '../../store/weather/selectors';

const YaMap = () => {
  const { coord, name } = useSelector(cityCoordSelector);

  // Initial state map
  const state = {
    center: [coord?.lat, coord?.lon], // coordinates by default
    zoom: 9, // scale by default
    controls: ['zoomControl', 'fullscreenControl'], // map control items
  };

  return (
    <>
      <YMaps>
        <Map
          state={state} // controlled map instead uncontrolled (defaultState)
          modules={['control.ZoomControl', 'control.FullscreenControl']}
        >
          {/*** Метка на карте с координатами ***/}
          {/*** Balloon всплывающая подсказка для метки ***/}
          <Placemark
            geometry={[coord?.lat, coord?.lon]}
            modules={['geoObject.addon.balloon']}
            properties={{ balloonContentBody: name }}
          />

          <TypeSelector options={{ float: 'right' }} />
        </Map>
      </YMaps>
    </>
  );
};

export default YaMap;

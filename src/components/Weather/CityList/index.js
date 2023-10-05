import { cities } from './cities';

/*** Sort cities list ***/
export const sortedCities = cities.sort((firstItem, secondItem) => {
  return firstItem.name.localeCompare(secondItem.name);
});

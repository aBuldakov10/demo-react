import React, { useEffect, useState } from 'react';

// Хук для отображения контента при заданном размере экрана
const useMedia = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches); // true || false

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) setMatches(media.matches);

    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);

    // удалить слушателя, дабы он не срабатывал в компоненте, в котором не был вызван этот хук
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches; // true || false
};

export default useMedia;

// // использование в компоненте
// const small = useMedia('(max-width: 767px)');
// {small && 'Mobile version'}

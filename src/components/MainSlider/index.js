export const MainOptions = {
  watchOverflow: true,
  allowTouchMove: false,
  slidesPerView: 1,
  spaceBetween: 50,
  speed: 1000,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  },
};

export const ThumbOptions = {
  slidesPerView: 2,
  spaceBetween: 10,
  breakpoints: {
    390: {
      slidesPerView: 3,
    },
    576: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5,
    },
    992: {
      spaceBetween: 40,
      slidesPerView: 7,
    },
  },
};

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, EffectCreative } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/scss/navigation';

// Files
import './MainSlider.scss';
import { MainOptions, ThumbOptions } from './index';
import img1 from './wallpaper_1.jpg';
import img2 from './wallpaper_2.jpg';
import img3 from './wallpaper_3.jpg';
import img4 from './wallpaper_4.jpg';

const MainSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeSlide, setActiveSlide] = useState(null);
  const [fadeClass, setFadeClass] = useState(false);

  const Images = [
    {
      id: '1',
      src: img1,
      alt: 'alt-1',
      title: 'Heading 1',
      desc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis placerat sollicitudin. ' +
        'Praesent luctus, ex nec finibus semper, neque purus pretium lectus, id ullamcorper est velit ut orci. ' +
        'Morbi egestas turpis non metus egestas, sed ullamcorper tellus scelerisque.',
    },
    {
      id: '2',
      src: img2,
      alt: 'alt-2',
      title: 'Heading 2',
      desc:
        'Vivamus accumsan eros in nulla sagittis laoreet. In ac fringilla magna, id molestie tellus. ' +
        'Aenean sit amet elit vitae ipsum sollicitudin sollicitudin. Vivamus maximus ac justo vulputate interdum. ' +
        'Aenean a risus ut nisi sodales mattis vel id magna.',
    },
    {
      id: '3',
      src: img3,
      alt: 'alt-3',
      title: 'Heading 3',
      desc:
        'Ut semper purus ut eleifend sagittis. Fusce ullamcorper purus nisl, in volutpat nisi sodales quis. ' +
        'Sed dolor est, fringilla sed turpis in, luctus dictum dui. Curabitur consectetur bibendum dolor vitae rutrum. ' +
        'Vestibulum eu lacus et ligula faucibus convallis sed vitae magna.',
    },
    {
      id: '4',
      src: img4,
      alt: 'alt-4',
      title: 'Heading 4',
      desc:
        'Ut blandit feugiat massa, sit amet lobortis leo sollicitudin id. Vivamus lacus diam, eleifend vitae ' +
        'blandit ut, tempor in nisi. Cras pretium massa interdum malesuada lobortis. Phasellus aliquet suscipit enim ' +
        'nec aliquet. Proin feugiat faucibus faucibus.',
    },
  ];

  /*** Handler ***/
  const handleInitSlide = ({ slides }) => {
    const filteredArr = slides.filter((item) => item.classList.contains('swiper-slide-active'));
    const slideId = filteredArr[0].getAttribute('data-id');
    const imageData = Images.find(({ id }) => id === slideId);

    setActiveSlide(imageData);
  };
  const handleChangeSlide = ({ slides }) => {
    const filteredArr = slides.filter((item) => item.classList.contains('swiper-slide-active'));
    const slideId = filteredArr[0].getAttribute('data-id');
    const imageData = Images.find(({ id }) => id === slideId);

    setFadeClass(true);

    setTimeout(() => {
      setActiveSlide(imageData);
      setFadeClass(false);
    }, 400);
  };

  return (
    <>
      {/*** Main slider ***/}
      <Swiper
        className="main-slider gallery-top"
        effect={'creative'}
        {...MainOptions}
        modules={[Navigation, Thumbs, EffectCreative]}
        watchSlidesProgress
        navigation
        onSlideChangeTransitionStart={handleChangeSlide}
        onSwiper={handleInitSlide}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
      >
        {Images.map(({ id, src, alt, title }, index) => (
          <SwiperSlide key={index} data-id={id}>
            <div className="main-slider__item">
              <img src={src} alt={alt} title={title} />
            </div>
          </SwiperSlide>
        ))}

        {/* обновить README.md */}
        <div className={`slide-content ${fadeClass ? 'fade' : ''}`}>
          <h3>{activeSlide?.title}</h3>
          <p>{activeSlide?.desc}</p>
        </div>
      </Swiper>

      {/*** Main slider thumbs ***/}
      <Swiper className="gallery-thumbs" {...ThumbOptions} modules={[Thumbs]} onSwiper={setThumbsSwiper}>
        {Images.map(({ src, alt, title }, index) => (
          <SwiperSlide key={index}>
            <div className="main-slider__item main-slider__item--thumb">
              <img src={src} alt={alt} title={title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainSlider;

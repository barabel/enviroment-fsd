import { type TPopupChild } from '@/shared/types';
import cn from 'classnames';
import './popup-image-slider.scss';
import { ReactButtonClose } from '@/shared/react/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useEffect, useState } from 'react';
import { Icon } from '@/shared/react/icon';
import { IconsArray } from '@/shared/enums';
import { getImageSlides } from './api';

export interface IPopupImageSlider {
  url: string
}

export interface ISlideImg {
  src: string
  alt: string
}

const PopupImageSlider: TPopupChild<IPopupImageSlider> = ({
  className,
  url,
  closePopup,
}) => {
  const [items, setItems] = useState<ISlideImg[]>();

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (url) {
      getImageSlides(url).then(res => {
        if (res) {
          setItems(res.items);
        }
      }).catch((error) => {
        console.error(error);
      })
    }
  }, [])

  return (
    <div className={cn('popup-image-slider', className)}>
      <ReactButtonClose
        className='popup-image-slider__btn-close react-button-close--white'
        onClick={closePopup}
      />
      <div className="popup-image-slide__content">
        {items &&
            <>
              <Swiper
                  slidesPerView={1}
                  className={'popup-image-slider__swiper'}
                  modules={[Navigation]}
                  allowTouchMove={items.length > 1}
                  loop={true}
                  navigation={{
                    prevEl,
                    nextEl,
                  }}
              >
                {items.map((slide, i) => (
                  <SwiperSlide key={i} className="popup-image-slider__swiper-slide">
                    <img src={slide.src} alt={slide.alt}/>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={cn('popup-image-slider__nav-container', { 'popup-image-slider__nav-container--hidden': items.length < 2 })}>
                <div ref={(node) => { setPrevEl(node); }}>
                  <Icon icon={IconsArray.sliderBtn}
                        className="popup-image-slider__nav-arrow popup-image-slider__nav-arrow--prev"/>
                </div>
                <div ref={(node) => { setNextEl(node); }}>
                  <Icon icon={IconsArray.sliderBtn} className="popup-image-slider__nav-arrow"/>
                </div>
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default PopupImageSlider;

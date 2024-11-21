import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Slides } from '../../conts';
import './slider.css';

function Slider() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
    >
      {Slides.map((slide) => (
        <SwiperSlide key={slide.Id}>
          <div className="banner">
            <picture>
              <source type="image/webp" srcSet={`${slide.Image}.webp, ${slide.Image}@2x.webp 2x`} />
              <img src={`${slide.Image}.jpg`} srcSet={`${slide.Image}@2x.jpg 2x`} width="1280" height="280" alt="баннер" />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{slide.Title}</span>
              <span className="banner__text">{slide.Description}</span>
              <a className="btn" href={slide.Link}>Подробнее</a>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;

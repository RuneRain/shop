import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.scss'

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider_wrap">
      <Slider {...settings}>
        <div>
          <img className="pc" src="./images/img01.webp" alt="pc"/>
          <img className="mobile" src="./images/img01_m.webp" alt="mobile"/>
        </div>
        <div>
          <img className="pc" src="./images/img02.webp" alt="pc"/>
          <img className="mobile" src="./images/img02_m.webp" alt="mobile"/>
        </div>
        <div>
          <img className="pc" src="./images/img03.webp" alt="pc"/>
          <img className="mobile" src="./images/img03_m.webp" alt="mobile"/>
        </div>              
      </Slider>
      <div className='absolute w-full top-2/3 md:top-1/2 text-center'>
        <img className="w-1/3 md:w-1/6 m-auto mb-4" src="./images/womens_polo_logo_white.svg" alt="배너안로고" />
        <p className=" text-white text-5xl md:text-4xl font-serif">Foundation</p>
      </div>
    </div>
  );
}
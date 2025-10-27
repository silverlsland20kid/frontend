import React, { useState } from "react";
import Slider from "react-slick";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SwiperSlideComponent from "./pages/SwiperSlide";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      id: 1,
      src: "./imgs/cat1.jpg",
      alt: "Image1",
    },
    {
      id: 2,
      src: "./imgs/cat2.jpg",
      alt: "Image2",
    },
    {
      id: 3,
      src: "./imgs/cat3.jpg",
      alt: "Image3",
    },
    {
      id: 4,
      src: "./imgs/cat4.jpg",
      alt: "Image4",
    },
    {
      id: 5,
      src: "./imgs/cat5.jpg",
      alt: "Image5",
    },
    {
      id: 6,
      src: "./imgs/cat6.jpg",
      alt: "Image6",
    },
  ];

  // react-slick의 설정 객체 (props로 전달됨)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
    arrows: true,
    fade: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      {" "}
      {/* ✅ JSX에서는 하나의 루트 요소만 반환 가능하므로 <>...</> (Fragment)로 감싸줌 */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2 className="text-center mb-4">이미지 슬라이더</h2>
            <div className="slider-wrapper">
              {/*...settings => 객체를 펼쳐서 각각의 속성을 <Slider>에 전달하는 문법 (스프레드 문법) */}
              <Slider {...settings}>
                {images.map(
                  (
                    image // 각 슬라이드마다 고유 key 필요 (React 규칙)
                  ) => (
                    <div key={image.id} className="slide-item">
                      <div className="px-2">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="img-fluid w-100"
                          style={{ height: "400px", objectFit: "cover" }}
                        />
                        <div className="slide-caption mt-2">
                          <h6>{image.alt}</h6>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </Slider>
            </div>

            <div className="text-center mt-3">
              <p className="text-muted">
                {/* ✅ currentSlide는 0부터 시작하므로 +1 해서 표시 */}
                현재 이미지: {currentSlide + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ✅ Swiper 기반 슬라이드 추가 컴포넌트 (별도 파일에서 import) */}
      <SwiperSlideComponent />
    </>
  );
}

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SwiperSlide.css";

function SwiperSlideComponent() {
  const images = [
    {
      id: 1,
      src: "./imgs/cat1.jpg",
      alt: "Swiper Image 1",
    },
    {
      id: 2,
      src: "./imgs/cat2.jpg",
      alt: "Swiper Image 2",
    },
    {
      id: 3,
      src: "./imgs/cat3.jpg",
      alt: "Swiper Image 3",
    },
    {
      id: 4,
      src: "./imgs/cat4.jpg",
      alt: "Swiper Image 4",
    },
    {
      id: 5,
      src: "./imgs/cat5.jpg",
      alt: "Swiper Image 5",
    },
    {
      id: 6,
      src: "./imgs/cat6.jpg",
      alt: "Swiper Image 6",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center mb-4">Swiper 슬라이더</h2>
          <div className="swiper-container">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              slidesPerGroup={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {images.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className="swiper-slide-item">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="img-fluid w-100"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="swiper-caption mt-2">
                      <h6>{image.alt}</h6>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwiperSlideComponent;

// src/pages/SwiperSlide.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SwiperSlide.css";

export default function SwiperSlideComponent() {
  const images = [
    { id: 1, src: "/imgs/cat1.jpg", alt: "Image 1" },
    { id: 2, src: "/imgs/cat2.jpg", alt: "Image 2" },
    { id: 3, src: "/imgs/cat3.jpg", alt: "Image 3" },
    { id: 4, src: "/imgs/cat4.jpg", alt: "Image 4" },
  ];

  return (
    <div className="swiper-section" style={{ marginTop: 24 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          992: { slidesPerView: 1 },
        }}
        style={{ paddingBottom: 32 }} // pagination이 가리지 않게 여백
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div style={{ padding: 8 }}>
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: 280,
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

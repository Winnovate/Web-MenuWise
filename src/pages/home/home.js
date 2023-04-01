import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/swiper.css";

import logo from "../../../src/assets/logo.png";

import img1 from "../../../src/assets/images/home/1.png";
import img2 from "../../../src/assets/images/home/2.png";
import img3 from "../../../src/assets/images/home/3.png";
import img4 from "../../../src/assets/images/home/4.png";
import img5 from "../../../src/assets/images/home/5.png";
import img6 from "../../../src/assets/images/home/6.png";
import img7 from "../../../src/assets/images/home/7.png";

import "./style.css";

// import Swiper core and required modules

const Home = () => {
  //   const [, ] = useState();

  const handleDownload = () => {
    window.open(
      "https://github.com/Winnovate/Mobile-MenuWise/releases/download/prod/MenuWise.apk",
      "_blank"
    );
  };
  return (
    <div>
      <nav className="cus-nav">
        <img className="cus-logo" src={logo} alt="logo" />

        <div className="cus-links-wrapper">
          <a className="cus-links" href="/login">
            Login
          </a>
          <a className="cus-links" href="/register">
            Create Account
          </a>
          <a
            className="cus-links cus-cta"
            href="https://github.com/Winnovate/Mobile-MenuWise/releases/download/prod/MenuWise.apk"
            target="_blank"
          >
            Download
          </a>
        </div>
      </nav>
      <section className="cus-section-main">
        <div className="cus-hero-left">
          <h1 className="cus-heading-h1">MenuWise</h1>
          <h2 className="cus-heading-h2">Making Food accessible</h2>
          <div className="cus-btn cus-cta" onClick={handleDownload}>
            <div className="cus-btn-text">Download</div>
            <span>Avaiable for Android | Coming soon for IOS</span>{" "}
          </div>
        </div>

        <div className="cus-hero-right">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
            }}
            spaceBetween={10}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <img src={img1} alt="logo" width={"300px"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img2} alt="logo" width={"300px"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img3} alt="logo" width={"300px"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img4} alt="logo" width={"300px"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img5} alt="logo" width={"300px"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img6} alt="logo" width={"300px"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={img7} alt="logo" width={"300px"} />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;

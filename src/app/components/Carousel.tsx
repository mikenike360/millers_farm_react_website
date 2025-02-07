"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Carousel() {
  return (
    <Slider {...settings} className="max-w-4xl mx-auto">
      <div>
        <p className="text-lg italic">
          "Millers Farm Island was everything we dreamed of. Our guests
          couldn’t stop raving about the beautiful scenery!"
        </p>
        <p className="mt-4 font-bold">— Sarah &amp; James</p>
      </div>
      <div>
        <p className="text-lg italic">
          "We loved the barn, the water views, and the personal touch from the 
          staff. It was the most magical day!"
        </p>
        <p className="mt-4 font-bold">— Emily &amp; Andrew</p>
      </div>
      <div>
        <p className="text-lg italic">
          "I couldn’t have asked for a better venue. The entire day 
          was seamless, and the photos are breathtaking!"
        </p>
        <p className="mt-4 font-bold">— Jason &amp; Claire</p>
      </div>
    </Slider>
  );
}

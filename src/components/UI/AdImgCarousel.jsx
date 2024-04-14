/* eslint-disable react/no-array-index-key */
// import React from 'react';
// import ReactDOM from 'react-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // This import assumes you're using a loader like Webpack
import '../../styles/AdImgCarousel.css'; // custom styles for this component

import { Carousel } from 'react-responsive-carousel';

export default function AdImgCarousel({ images }) {
  return (
    <Carousel dynamicHeight>
      <div>
        <img src="/img/sell/cd.png" alt="CD" />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div>
        <img src="/img/sell/gun.jpeg" alt="Gun" />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div>
        <img src="/img/sell/macintosh.png" alt="Macintosh" />
        {/* <p className="legend">Legend 3</p> */}
      </div>
      {images.map((imgUrl, i) => (
        <div key={i}>
          <img src={`/img/sell/${imgUrl}`} alt="Ad" />
        </div>
      ))}
    </Carousel>
  );
}

// ReactDOM.render(<AdImgCarousel />, document.querySelector('.demo-carousel'));

// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet"
// href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>

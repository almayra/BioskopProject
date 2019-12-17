import React from "react";
// import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from 'mdbreact';
import { MOVIE, MOVIE1, MOVIE2 } from "../support/ApiURL";
import {Carousel} from 'react-bootstrap'

const CarouselPage = () => {
    return (
      <Carousel>
      <Carousel.Item style={{height:'500px'}}>
        <img
          className="d-block w-100 joker"
          src={MOVIE}
          alt="First slide"
        />
        <Carousel.Caption>
          <div>
          <h4>Put on a Happy Face.</h4>
          <h1>JOKER : THE KILLING JOKE</h1>
          <p style={{color:'gray'}}>COMING SOON</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:'500px'}}>
        <img
          className="d-block w-100"
          src={MOVIE2}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h4>Collide with Destiny. Nothing on Earth could come between them.</h4>
          <h1>TITANIC II</h1>
          <p style={{color:'gray'}}>COMING SOON</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:'500px'}}>
        <img
          className="d-block w-100"
          src={MOVIE1}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h4>Don't. Set. Him. Off.</h4>
          <h1>JOHN WICK CHAPTER IV</h1>
          <p style={{color:'gray'}}>COMING SOON</p>
        </Carousel.Caption>
      </Carousel.Item>
</Carousel>
    );
  }
  
  export default CarouselPage;
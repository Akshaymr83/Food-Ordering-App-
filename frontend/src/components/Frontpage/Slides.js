import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../Images/slide1.jpg';
import slide2 from '../Images/slide2.jpg';
import slide3 from '../Images/slide3.jpg';
import bg2 from '../Images/bg2.jpg'

function Slides() {
  return (
    <Carousel style={{width:'100%' ,height:'100%',position:'absolute',paddingBottom:'300px'}}>
       
      
      <Carousel.Item interval={1000} style={{width:'100%'}}>
        <img src={slide1} alt='Second slide' style={{width:'100%',objectFit:'contain'}} />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000} style={{width:'100%'}}>
        <img src={slide2} alt='Thrd slide' style={{width:'100%',objectFit:'contain'}} />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000} style={{width:'100%'}}>
        <img src={slide3} alt='Forth slide' style={{width:'100%',objectFit:'contain'}} />
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slides;
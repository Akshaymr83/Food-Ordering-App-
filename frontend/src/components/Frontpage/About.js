import React, { useEffect, useRef } from 'react';
import './About.css';
import teamImage from '../assets/1.jpg';

function About() {
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <div className="about-container" ref={aboutRef}>
<h1>ABOUT <span style={{color:' #fb2157'}}>FOOD-MOOD</span></h1>
      <div className="about-content">
        <div className="about-content-left">
          <img src={teamImage} alt="Our Team" className="about-image" />
        </div>
        <div className="about-content-right" >
          <p className="about-description" style={{lineHeight:"38px"}}>
            Welcome to <b>FOOD MOOD</b>, your go-to destination for delicious and convenient food ordering.
            We are committed to bringing you the best dining experience from the comfort of your home.
            Our mission is to provide a diverse range of mouth-watering dishes that satisfy every craving.
          </p>
          
          <p className="about-text" style={{lineHeight:"38px"}}>
            At <b>FOOD MOOD</b>, we value quality ingredients, customer satisfaction, and innovation.
            We use only the freshest and finest ingredients in our dishes.
            Your happiness is our top priority, and we strive to provide excellent service and delicious food.
            We constantly explore new recipes and technologies to improve your food ordering experience.
          </p>
          <p><button style={{padding:'10px',background:' #fb2157',color:'white',borderRadius:'17px',border:'none'}}>View More <i class="fa-solid fa-arrow-right"></i> </button></p>
        </div>
      </div>
    </div>
  );
}

export default About;

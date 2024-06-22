import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NAV from '../Navbar/NAV';

import '../Frontpage/frontpage.css';
import combo1 from '../Images/combo1.avif';
import combo2 from '../Images/combo2.jpg';
import combo3 from '../Images/combo3.jpg';
import chef1 from '../Images/chef1.webp';
import chef2 from '../Images/chef2.jpeg';
import chef3 from '../Images/chef3.webp';
import Menu from './Menu';
import Gallery from './Gallery';
import Chef from './Chef';
import Slides from './Slides';
import quote from '../Images/frontendbg2.jpg';
import Review from './Review';
import Footer from './Footer';
import ReviewForm from './reviewForm';
import { useParams } from 'react-router-dom';

function Frontpage() {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem('currentUser')) 
  useEffect(() => {
    // Fetch cart data for the logged-in user
     axios.get(`http://localhost:4000/user/${user._id}`)
      .then((res) => {
        console.log("Cart data received:", res.data);
        setCartItems(res.data.userCollection);
      })
      .catch((err) => {
        console.log("Error fetching cart data:", err);
      });
  }, []);

  const addToCart = (food) => {
    // Add logic to add the food item to the cart
    console.log("Added to cart:", food);
  };
// const  user_id=useParams()
  return (
    <div className='FRONTPAGE'>
      <NAV userId={userId} cartItems={cartItems} />
      <section className='home' id='home'>
        <Slides />
      </section>
      <section style={{ marginTop: '10%' }}>
        {/* <h1 className="text" style={{ color: 'black', fontFamily: '"Poppins", sans-serif', fontWeight: '600', fontSize: '70px', letterSpacing: '1.1px', textAlign: 'center', textTransform: 'uppercase' }}>
          "Every dish tells a story, let your taste buds be the narrator."
        </h1> */}
        <div style={{ display: 'flex' }}>
          <div >
            {/* <div style={{position:'absolute',paddingTop:'18rem',paddingLeft:'4rem'}}>
              <h6 style={{fontSize:"90px",fontWeight:'700',color:'white',fontFamily:'"Poppins", sans-serif'}} >
                Discover,<br></br>  order,<br></br>  devour." <br></br>All in one place</h6></div> */}
            <img src={quote} style={{ height: '100%', width: '100%', objectFit: 'contain' }}></img>
          </div>
        </div>
      </section>
      <section className="section__container destination__container" id='offer'>
        <div className="section__header">
          <div>
            <h2 className="section__title">TODAY'S OFFER.<span className='section__title__span'>GRAB it !!</span></h2>
            <p style={{ color: 'white', textAlign: 'center', letterSpacing: '15px', fontSize: '30px', fontFamily: "monospace" }}>WEEKEND DHAMAKA OFFER!!!</p>
          </div>
          <div class="destination__nav">
            <span><i className="ri-arrow-left-s-line"></i></span>
            <span><i className="ri-arrow-right-s-line"></i></span>
          </div>
        </div>
        <div className="destination__grid">
          <div className="destination__card">
            <img src={combo1} alt="destination" />
            <div className="destination__details">
              <p className="destination__title">COMBO OFFER</p>
              <p className="destination__subtitle">Buy 2 Burger,get 1 free</p>
            </div>
          </div>
          <div className="destination__card">
            <img src={combo2} alt="destination" />
            <div className="destination__details">
              <p className="destination__title">Wednesday</p>
              <p className="destination__subtitle">Offer Meal</p>
            </div>
          </div>
          <div className="destination__card">
            <img src={combo3} alt="destination" />
            <div className="destination__details">
              <p className="destination__title">FryDay MEAL</p>
              <p className="destination__subtitle">OFFER PLATE</p>
            </div>
          </div>
          <div className="destination__card">
            <img src={combo2} alt="destination" />
            <div className="destination__details">
              <p className="destination__title">Offer Meal</p>
              <p className="destination__subtitle">FREE FOOD</p>
            </div>
          </div>
          <div className="destination__card">
            <img src={combo2} alt="destination" />
            <div className="destination__details">
              <p className="destination__title">BUY at 99 rs</p>
              <p className="destination__subtitle">Offer</p>
            </div>
          </div>
          <div className="destination__card">
            <img src={combo2} alt="destination" />
            <div className="destination__details">
              <p className="destination__title">Buy 4 get @299</p>
              <p className="destination__subtitle">WEEKEND OFFER</p>
            </div>
          </div>
        </div>
      </section>
      <section className="gallary">
        <div className="section__container gallary__container">
          <div className="image__gallary">
            <div className="gallary__col">
              <img src={chef1} alt="gallary" />
            </div>
            <div className="gallary__col">
              <img src={chef3} alt="gallary" />
              <img src={chef2} alt="gallary" />
            </div>
          </div>
          <div className="gallary__content">
            <div>
              <h2 className="chef__title">
                Our Heros!Meet our culinary wizards!
              </h2>
              <p className="section__subtitle">
                From mastering diverse cuisines to crafting innovative dishes, our chefs blend creativity, precision, and
                passion to bring you unforgettable dining experiences
              </p>
              <button className="btn">View Menu</button>
            </div>
          </div>
        </div>
      </section>
      <Gallery setSelectedCategory={setSelectedCategory} />
      <Menu selectedCategory={selectedCategory} addToCart={addToCart} userId />
      {/* <Gallery  foods ={foods} />
      <Menu   foods ={foods} addToCart={addToCart} userId /> */}
      <Chef />
      <Review />
      <Footer />
    </div>
  );
}

export default Frontpage;


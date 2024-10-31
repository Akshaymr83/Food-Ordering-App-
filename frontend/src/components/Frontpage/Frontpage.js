
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Link,useParams } from 'react-router-dom';

// import NAV from '../Navbar/NAV';
// import Menu from './Menu';
// import Gallery from './Gallery';
// import Chef from './Chef';
// import Slides from './Slides';
// import Review from './Review';
// import Footer from './Footer';
// import About from './About';
// import chef1 from '../Images/chef1.webp';
// import chef2 from '../Images/chef2.jpeg';
// import chef3 from '../Images/chef3.webp';
// import MiniChef from './MiniChef';




// function Frontpage() {
//   const { id } = useParams();
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [cartItems, setCartItems] = useState([]);
//   const [aboutVisible, setAboutVisible] = useState(false); // State to track if About section is visible
//   const aboutRef = useRef(null); // Ref for About section

//   const user = JSON.parse(localStorage.getItem('currentUser'));

//   useEffect(() => {
//     axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${user._id}`)
//       .then((res) => {
//         console.log("Cart data received:", res.data);
//         setCartItems(res.data.userCollection);
//       })
//       .catch((err) => {
//         console.log("Error fetching cart data:", err);
//       });
//   }, [user._id]);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (aboutRef.current) {
//         const { top } = aboutRef.current.getBoundingClientRect();
//         if (top <= window.innerHeight && top >= 0) {
//           setAboutVisible(true);
//         }
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const addToCart = (food) => {
//     setCartItems([...cartItems, food]);
//   };

//   return (
//     <div className='FRONTPAGE'>
//       <NAV userId={id} cartItems={cartItems} />
//       <section className='home' id='home'>
//         <Slides />
//       </section>
//       <section ref={aboutRef} style={{paddingTop:'5rem'}}>
//         <About isVisible={aboutVisible} />
//       </section>
//       <section className="gallary">
//         <div className="section__container gallary__container">
//           <div className="image__gallary">
//             <div className="gallary__col">
//               <img src={chef1} alt="Gallery 1" />
//             </div>
//             <div className="gallary__col">
//               <img src={chef3} alt="Gallery 2" />
//               <img src={chef2} alt="Gallery 3" />
//             </div>
//           </div>
//           <div className="gallary__content">
//             <div>
//               <h2 className="chef__title">
//                 Our Heroes! Meet our culinary wizards!
//               </h2>
//               <p className="section__subtitle">
//                 From mastering diverse cuisines to crafting innovative dishes, our chefs blend creativity, precision, and passion to bring you unforgettable dining experiences.
//               </p>
//               <Link to={"/menu"}><button className="btn">View Menu</button></Link>
//             </div>
//           </div>
//         </div>
//       </section>
//       <Gallery setSelectedCategory={setSelectedCategory} />
//       <Menu selectedCategory={selectedCategory} addToCart={addToCart} />

//       <Chef />
//       <Review />
//       <Footer />
//       <MiniChef/>
//     </div>
//   );
// }

// export default Frontpage;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';
// import { driver } from 'driver.js'; // Correct import as named export
// import 'driver.js/dist/driver.css'; // CSS import

// import NAV from '../Navbar/NAV';
// import Menu from './Menu';
// import Gallery from './Gallery';
// import Chef from './Chef';
// import Slides from './Slides';
// import Review from './Review';
// import Footer from './Footer';
// import About from './About';
// import chef1 from '../Images/chef1.webp';
// import chef2 from '../Images/chef2.jpeg';
// import chef3 from '../Images/chef3.webp';
// import MiniChef from './MiniChef';

// function Frontpage() {
//     const { id } = useParams();
//     const [selectedCategory, setSelectedCategory] = useState("All");
//     const [cartItems, setCartItems] = useState([]);
//     const [aboutVisible, setAboutVisible] = useState(false);
//     const aboutRef = useRef(null);

//     const user = JSON.parse(localStorage.getItem('currentUser'));

//     useEffect(() => {
//         axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${user._id}`)
//             .then((res) => {
//                 console.log("Cart data received:", res.data);
//                 setCartItems(res.data.userCollection);
//             })
//             .catch((err) => {
//                 console.log("Error fetching cart data:", err);
//             });
//     }, [user._id]);

//     useEffect(() => {
//         const handleScroll = () => {
//             if (aboutRef.current) {
//                 const { top } = aboutRef.current.getBoundingClientRect();
//                 if (top <= window.innerHeight && top >= 0) {
//                     setAboutVisible(true);
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const addToCart = (food) => {
//         setCartItems([...cartItems, food]);
//     };

//     const startTour = () => {
//         const driverObj = driver({ // Instantiate driver using named import
//             showProgress: true,
//             steps: [
//                 {
//                     element: '#home',
//                     popover: {
//                         title: 'Welcome to FOOD MOOD!',
//                         description: 'This is the place to find the best food.',
//                         position: 'bottom',
//                     },
//                 },
//                 {
//                     element: '#about',
//                     popover: {
//                         title: 'About Us',
//                         description: 'Learn more about our culinary journey!',
//                         position: 'top',
//                     },
//                 },
//                 {
//                     element: '.gallary__content',
//                     popover: {
//                         title: 'Meet Our Chefs!',
//                         description: 'Discover the amazing chefs behind our dishes.',
//                         position: 'top',
//                     },
//                 },
//                 {
//                     element: '.menu',
//                     popover: {
//                         title: 'View Our Menu',
//                         description: 'Explore our delicious food offerings!',
//                         position: 'right',
//                     },
//                 },
//                 {
//                     popover: {
//                         title: 'Happy Coding',
//                         description: 'And that is all, go ahead and start adding tours to your applications.',
//                     },
//                 },
//             ]
//         });
//         driverObj.drive(); // Start the tour
//     };

//     useEffect(() => {
//         startTour();
//     }, []); // Automatically start the tour on component mount

//     return (
//         <div className='FRONTPAGE'>
//             <NAV userId={id} cartItems={cartItems} />
//             <section className='home' id='home'>
//                 <Slides />
//             </section>
//             <section ref={aboutRef} id="about" style={{ paddingTop: '5rem' }}>
//                 <About isVisible={aboutVisible} />
//             </section>
//             <section className="gallary">
//                 <div className="section__container gallary__container">
//                     <div className="image__gallary">
//                         <div className="gallary__col">
//                             <img src={chef1} alt="Gallery 1" />
//                         </div>
//                         <div className="gallary__col">
//                             <img src={chef3} alt="Gallery 2" />
//                             <img src={chef2} alt="Gallery 3" />
//                         </div>
//                     </div>
//                     <div className="gallary__content">
//                         <div>
//                             <h2 className="chef__title">
//                                 Our Heroes! Meet our culinary wizards!
//                             </h2>
//                             <p className="section__subtitle">
//                                 From mastering diverse cuisines to crafting innovative dishes, our chefs blend creativity, precision, and passion to bring you unforgettable dining experiences.
//                             </p>
//                             <Link to={"/menu"}>
//                                 <button className="btn">View Menu</button>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <Gallery setSelectedCategory={setSelectedCategory} />
//             <Menu selectedCategory={selectedCategory} addToCart={addToCart} />
//             <Chef />
//             <Review />
//             <Footer />
//             <MiniChef />
//         </div>
//     );
// }

// export default Frontpage;







import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

import NAV from '../Navbar/NAV';
import Menu from './Menu';
import Gallery from './Gallery';
import Chef from './Chef';
import Slides from './Slides';
import Review from './Review';
import Footer from './Footer';
import About from './About';
import chef1 from '../Images/chef1.webp';
import chef2 from '../Images/chef2.jpeg';
import chef3 from '../Images/chef3.webp';
import MiniChef from './MiniChef';

function Frontpage() {
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cartItems, setCartItems] = useState([]);
    const [aboutVisible, setAboutVisible] = useState(false);
    const aboutRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('currentUser'));

    useEffect(() => {
        // axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${user._id}`)
        axios.get(`${process.env.REACT_APP_API_URL}/${user._id}`)
            .then((res) => {
                console.log("Cart data received:", res.data);
                setCartItems(res.data.userCollection);
            })
            .catch((err) => {
                console.log("Error fetching cart data:", err);
            });
    }, [user._id]);

    useEffect(() => {
        const handleScroll = () => {
            if (aboutRef.current) {
                const { top } = aboutRef.current.getBoundingClientRect();
                if (top <= window.innerHeight && top >= 0) {
                    setAboutVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const addToCart = (food) => {
        setCartItems([...cartItems, food]);
    };

    const startTour = () => {
        // Check if the tour has been shown before
        const tourShown = localStorage.getItem('tourShown');

        if (!tourShown) { // Only start the tour if it hasn't been shown
            const driverObj = driver({
                showProgress: true,
                steps: [
                    {
                        element: '#home',
                        popover: {
                            title: 'Welcome to FOOD MOOD!',
                            description: 'This is the place to find the best food.',
                            position: 'bottom',
                        },
                    },
                    {
                        element: '#about',
                        popover: {
                            title: 'About Us',
                            description: 'Learn more about our culinary journey!',
                            position: 'top',
                        },
                    },
                    {
                        element: '.gallary__content',
                        popover: {
                            title: 'Meet Our Chefs!',
                            description: 'Discover the amazing chefs behind our dishes.',
                            position: 'top',
                        },
                    },
                    {
                        element: '.menu',
                        popover: {
                            title: 'View Our Menu',
                            description: 'Explore our delicious food offerings!',
                            position: 'right',
                        },
                    },
                    {
                        popover: {
                            title: 'Happy Coding',
                            description: 'And that is all, go ahead and start adding tours to your applications.',
                        },
                    },
                ]
            });
            driverObj.drive(); // Start the tour

            // Set tourShown in local storage so it doesn't show again
            localStorage.setItem('tourShown', 'true');
        }
    };

    useEffect(() => {
        startTour();
    }, []); // Automatically start the tour on component mount

    return (
        <div className='FRONTPAGE'>
            <NAV userId={id} cartItems={cartItems} />
            <section className='home' id='home'>
                <Slides />
            </section>
            <section ref={aboutRef} id="about" style={{ paddingTop: '5rem' }}>
                <About isVisible={aboutVisible} />
            </section>
            <section className="gallary">
                <div className="section__container gallary__container">
                    <div className="image__gallary">
                        <div className="gallary__col">
                            <img src={chef1} alt="Gallery 1" />
                        </div>
                        <div className="gallary__col">
                            <img src={chef3} alt="Gallery 2" />
                            <img src={chef2} alt="Gallery 3" />
                        </div>
                    </div>
                    <div className="gallary__content">
                        <div>
                            <h2 className="chef__title">
                                Our Heroes! Meet our culinary wizards!
                            </h2>
                            <p className="section__subtitle">
                                From mastering diverse cuisines to crafting innovative dishes, our chefs blend creativity, precision, and passion to bring you unforgettable dining experiences.
                            </p>
                            <Link to={"/menu"}>
                                <button className="btn">View Menu</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Gallery setSelectedCategory={setSelectedCategory} />
            <Menu selectedCategory={selectedCategory} addToCart={addToCart} />
            <Chef />
            <Review />
            <Footer />
            <MiniChef />
        </div>
    );
}

export default Frontpage;

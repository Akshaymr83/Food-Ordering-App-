
import React, { useEffect, useState } from 'react';
import logo from '../Images/food img2.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './NAV.css';

function NAV({ userId, cartItems }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
  const state = useSelector((state) => state.handleCart);
  const { id } = useParams();
  const [collections,setcollection]=useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${id}`);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`);
        const userData = response.data;
        console.log(userData);
        setcollection( userData.userCollection.length);
        console.log(collections);
        
        setFormData(prevState => ({
          ...prevState,
          email: userData.email,
          name: userData.name,
         
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [id]);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
  
  });


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Do you want to exit the website?");

    if (confirmLogout) {
      navigate("/login");
    }
  };

  const toggleProfileBox = () => {
    setIsProfileBoxOpen(!isProfileBoxOpen);
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-light  fixed-top" style={{ height: '73px' ,width:'100%' }}>
    <div className="container-fluid" style={{background:"white",height:'73px'}}>
        <Link className="navbar-brand" to={`/frontpage/${id}`}>
          <img src={logo} alt="logo" style={{ width: '90px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav" >
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${isNavOpen ? 'bg' : ''}`} style={{ marginLeft: '3rem' }}>
            <li className="nav-item">
              <Link to={`/frontpage/${id}`} className="nav-link"><b>Home</b></Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={`/frontpage/${id}#offer`} ><b>Offers</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Gallary"><b>Gallery</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Menu"><b>Menu</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Chefs"><b>Chefs</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#Review"><b>Review</b></a>
            </li>
            <li className="nav-item">
              <Link to={`/orderhistory/${id}`} className="nav-link"><b>OrderHistory</b></Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item" >
              <Link className="nav-link" to={`/cart/${id}`}>
                <button className="btn">
                <i className="fa-solid fa-cart-shopping me-1"></i> Cart({collections  ? collections : 0})
                </button>
              </Link>
            </li>
            <li className="nav-item" >
              <button className="btn" onClick={toggleProfileBox}>
                <i className="fa-solid fa-user me-1"></i> Profile
              </button>
            </li>
          </ul>
        </div>
      </div>
      {isProfileBoxOpen && (
        <div className="profile-box-dropdown">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ border: '2px solid black', borderRadius: '50%', padding: '1rem', height: '5rem', width: '5rem' }}>
              <i className="fa-solid fa-user me-1" style={{ fontSize: '3rem', paddingLeft: '2px' }}></i>
            </div>
            <p> <h4 style={{textTransform:'capitalize',fontWeight:'700'}}>{formData.name}</h4></p>
         
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NAV;



// import React, { useEffect, useState } from 'react';
// import logo from '../Images/food img2.png';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import './NAV.css';

// function NAV({ userId, cartItems }) {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false);
//   const { id } = useParams();
//   const [collections, setCollection] = useState(0);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`https://food-ordering-app-wlwn.onrender.com/user/${id}`);
//         const userData = response.data;
//         setCollection(userData.userCollection.length);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, [id]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   const handleLogout = (e) => {
//     e.preventDefault();
//     const confirmLogout = window.confirm("Do you want to exit the website?");
//     if (confirmLogout) {
//       navigate("/login");
//     }
//   };

//   const toggleProfileBox = () => {
//     setIsProfileBoxOpen(!isProfileBoxOpen);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light  fixed-top" style={{ height: '73px', width: '100%' }}>
//       <div className="container-fluid" style={{ background: "white", height: '73px' }}>
//         <Link className="navbar-brand" to={`/frontpage/${id}`}>
//           <img src={logo} alt="logo" style={{ width: '90px' }} />
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           onClick={toggleNav}
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
//           <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${isNavOpen ? 'bg' : ''}`} style={{ marginLeft: '3rem' }}>
//             <li className="nav-item">
//               <Link to={`/frontpage/${id}`} className="nav-link"><b>Home</b></Link>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href={`/frontpage/${id}#offer`}><b>Offers</b></a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Gallary"><b>Gallery</b></a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Menu"><b>Menu</b></a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Chefs"><b>Chefs</b></a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="#Review"><b>Review</b></a>
//             </li>
//             <li className="nav-item">
//               <Link to={`/orderhistory/${id}`} className="nav-link"><b>OrderHistory</b></Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link className="nav-link" to={`/cart/${id}`}>
//                 <button className="btn">
//                   <i className="fa-solid fa-cart-shopping me-1"></i> Cart({cartItems.length})
//                 </button>
//               </Link>
//             </li>
//             <li className="nav-item">
//               <button className="btn" onClick={toggleProfileBox}>
//                 <i className="fa-solid fa-user me-1"></i> Profile
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//       {isProfileBoxOpen && (
//         <div className="profile-box-dropdown">
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <div style={{ border: '2px solid black', borderRadius: '50%', padding: '1rem', height: '5rem', width: '5rem' }}>
//               <i className="fa-solid fa-user me-1" style={{ fontSize: '3rem', paddingLeft: '2px' }}></i>
//             </div>
//             <p><b>Name:</b> {formData.name}</p>
//             <p><b>Email:</b> {formData.email}</p>
//             <button className="btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default NAV;
// // 






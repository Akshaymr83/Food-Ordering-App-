import React, { useEffect, useState } from 'react';
import logo from '../Images/food img2.png';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './NAV.css'; // Import the CSS file

function AdminNav({ userId, cartItems })  {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage Navbar collapse
  const [isProfileBoxOpen, setIsProfileBoxOpen] = useState(false); // State to manage Profile box visibility
  const state = useSelector((state) => state.handleCart);
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        const userData = response.data;
        setFormData({
          ...formData,
          email: userData.email,
          name: userData.name
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [id, formData]);

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



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{height:'73px'}}>
      <div className="container">
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
        <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${isNavOpen ? 'bg' : ''}`} style={{gap:'2rem',marginLeft:'3rem'}}>
            <li><h4><b>ADMIN</b></h4></li>
          {/* <li className="nav-item" style={{textDecoration:'none'}}>
             <Link to={`/frontpage/${id}`} style={{textDecoration:'none'}}> <a className="nav-link" href="#home" style={{textDecoration:'none'}}>
                <b>Home</b>
               </a></Link> 
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#offer">
                 <b>Offers</b>
               </a>
            </li>
             <li className="nav-item">
               <a className="nav-link" href="#Gallary">
                 <b>Gallery</b>
               </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#Menu">
                 <b>Menu</b>
               </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#Chefs">
               <b>  Chefs</b>
            </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#Review">
                 <b>Review</b>
               </a>
             </li>
             <li className="nav-item" style={{textDecoration:'none'}}>
             <Link to={`/orderhistory/${id}`} style={{textDecoration:'none'}}> <a className="nav-link" href="#home" style={{textDecoration:'none'}}>
               <b>OrderHistory</b>
              </a></Link> 
            </li> */}
          </ul>
          <ul className="navbar-nav">

            <li className="nav-item" style={{paddingTop:'7px'}}>
            <button className="btn" onClick={handleLogout}>
            Logout
          </button>
            </li>
          </ul>
        </div>
      </div>
    
    </nav>
  );
}

export default AdminNav;




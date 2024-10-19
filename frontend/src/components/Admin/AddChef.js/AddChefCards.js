import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import '../AddChef.js/addChef.css'
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import AdminNav from '../../Navbar/AdminNav';



function ChefCard() {
  const [chefs, setChefs] = useState([]);


  useEffect(() => {
    // axios.get("https://food-ordering-app-wlwn.onrender.com/getChef")
    axios.get(`${process.env.REACT_APP_API_URL}/getChef`)
      .then((res) => {
        console.log("Data received:", res.data);
        setChefs(res.data.chefs);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  const handleDelete = (id) => {
    // axios.delete(`https://food-ordering-app-wlwn.onrender.com/deleteChef/${id}`)
    axios.delete(`${process.env.REACT_APP_API_URL}/deleteChef/${id}`)
      .then((res) => {
        console.log("Chefs deleted");
        // Update the state after deletion
        setChefs(chefs.filter(chef => chef._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting chef:", err);
        // Optionally, you can display an error message to the user
        // alert("Error deleting department. Please try again later.");
      });
  }
  


  return (
    <div>
       <div>  <AdminNav/></div>
      <div><Sidebar/></div>
    
      
      <div className='background grid' style={{height:'100%',paddingBottom:'2rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr ',columnGap:'1rem',marginTop:'10%',rowGap:'2rem'}}>
        
      {Array.isArray(chefs) && chefs.map((chef, index) => (
        <Card className='dcard  text-center' key={index} >
   
          {/* <Card.Img  style={{height:'150px',objectFit:'contain'}} className='Img'
            variant="top"
            src={`https://food-ordering-app-wlwn.onrender.com/${chef.image}`} // Assuming images are served from the root directory of the server
            alt={`Chef ${chef.chef}`}
            
         
          /> */}
              <Card.Img  style={{height:'150px',objectFit:'contain'}} className='Img'
            variant="top"
            src={`${process.env.REACT_APP_API_URL}/${chef.image}`} // Assuming images are served from the root directory of the server
            alt={`Chef ${chef.chef}`}
            
         
          />

          <Card.Body>
            <Card.Title><h3 style={{textAlign:'center'}}>{chef.chefname}</h3></Card.Title>
            <Card.Text>{chef.description}</Card.Text>

            <Link to={`/chefUpdate/${chef._id}`}><Button >Update</Button></Link>
            <Button variant="danger" onClick={() => handleDelete(chef._id)} >Delete</Button>
          </Card.Body>
        </Card>
      ))}
      </div>
    </div></div>
  );
}

export default ChefCard;

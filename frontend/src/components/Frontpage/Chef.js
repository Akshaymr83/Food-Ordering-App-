
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function Chef() {
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
  return (
    <div id='Chefs'  class="team">
        <h1>Our<span>Team</span></h1>

        <div class="team_box">
        {chefs.map((chef, index) =>(
                 <div class="profile" key={index}>
                 {/* <img src={`https://food-ordering-app-wlwn.onrender.com/${chef.image}`} /> */}
                 <img src={`${process.env.REACT_APP_API_URL}//${chef.image}`} />
 
                 <div class="info">
                     <h2 class="name">{chef.chefname}</h2>
                     <p class="bio">{chef.description}</p>
 
                   
                 </div>
             </div>

            ))}
           

            

          
        </div>
     
    </div>


  )
}

export default Chef
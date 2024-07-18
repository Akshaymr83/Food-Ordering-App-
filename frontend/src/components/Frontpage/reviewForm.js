import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


import '../Admin/Category/category.css'


const ReviewForm = () => {
  
  const { id } = useParams();
  const [reviewformData, setReviewFormData] = useState({
    name: '',

   
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        const userData = response.data;
        setReviewFormData(prevState => ({
          ...prevState,
         
          name: userData.name,
          
           // Populate email field with user's email
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, [id]);


  
  const [formData, setFormData] = useState({
    customer: '',
    image: null,
    description:''
  });
const navigate = useNavigate();
  const handleChange = (e) => {
    
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:4000/reviewName')
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('customer', formData.customer);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('description', formData.description);
  
    try {
      await axios.post('http://localhost:4000/review', formDataToSend);
      console.log('Review added successfully');
      alert('Review added successfully');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with an error:', error.response.data);
        alert('Server responded with an error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server:', error.request);
        alert('No response received from the server. Please try again later.');
      } else {
        // Something else happened in making the request
        console.error('Error adding Review:', error.message);
        alert('Error adding Review:', error.message);
      }
    }
  };


  return (
    <div className='form-bg' style={{marginTop:'-180px',padding:'1%',paddingBottom:'5%'}}>
      
   
    
   
  <div className='categoryform2'>
    
   
    <div className='categoryform' style={{background:'rgb(172 166 167 / 10%)'}}>
    
    <form onSubmit={handleSubmit}>
    <h3 style={{ textAlign: 'center',color:'black' }}>Review Form</h3>
     
    
     <input className="customer" type="text" name="customer" placeholder="Add name" value={reviewformData.name} onChange={handleChange}  style={{border:'0.7px solid black'}}/> <br></br>

      <input className="image" type="file" name="image" onChange={handleChange}  style={{border:'0.7px solid black'}}/> <br></br>
      <input  className="description"type="text" name="description" placeholder="description" value={formData.description} onChange={handleChange} style={{border:'0.7px solid black'}} /> <br></br>
      
      <button  className="submit"type="submit" style={{padding:'5px 13px 5px 13px',background:'#0d96f0',borderRadius:'1rem',border:'none',color:'white'}}>Submit</button>
    </form>
    </div>
    </div>
    </div>
   
  );
};

export default ReviewForm;

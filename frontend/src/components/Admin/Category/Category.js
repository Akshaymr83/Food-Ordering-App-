import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css'
import AdminNav from '../../Navbar/AdminNav';


const Category = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    category: ''
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const [categories, setCategories] = useState([]);



 
  useEffect(() => {
    // axios.get('https://food-ordering-app-wlwn.onrender.com/categoryName')
    axios.get(`${process.env.REACT_APP_API_URL}/categoryName`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image ||!formData.category) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('category', formData.category);



      // await axios.post('https://food-ordering-app-wlwn.onrender.com/category', formDataToSend);
      await axios.post(`${process.env.REACT_APP_API_URL}/category`, formDataToSend);
      console.log('Category added successfully');
      alert('Category added successfully');
      navigate('/CategoryTable')
      
      // You can redirect or perform any other action upon successful form submission
    } catch (error) {
      console.error('Error adding category: ', error);
      alert('Error adding category: ', error.message);
    }
  };



  return (
    <div className='form-bg'>
  <div>  <AdminNav/></div>
    
   
  <div className='background'style={{height:'100vh'}} >
    <div><Sidebar/></div>
   
    <div className='categoryform'>
    
    <form onSubmit={handleSubmit}>
    <h3 style={{ textAlign: 'center',color:'black' }}>category Form</h3>
     
    
     <input className="name" type="text" name="name" placeholder="Add name" value={formData.name} onChange={handleChange} /> <br></br>

      <input className="image" type="file" name="image" onChange={handleChange} /> <br></br>
      
      <input  className="category"type="text" name="category" placeholder="category" value={formData.category} onChange={handleChange} /> <br></br>
      
      <button  className="submit"type="submit" style={{padding:'5px 13px 5px 13px',background:'#0d96f0',borderRadius:'1rem',border:'none',color:'white'}}>Submit</button>
    </form>
    </div>
    </div>
    </div>
   
  );
};

export default Category;

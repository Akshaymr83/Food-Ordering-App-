import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css'
import AdminNav from '../../Navbar/AdminNav';


const ChefForm = () => {
  const [formData, setFormData] = useState({
    chefname: '',
    image: null,
    description:''
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const [chefs, setChefs] = useState([]);
  
  useEffect(() => {
    axios.get('https://food-ordering-app-wlwn.onrender.com/chefName')
      .then((res) => {
        setChefs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.chefname || !formData.image ||!formData.description) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('chefname', formData.chefname);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('description', formData.description);



      await axios.post('https://food-ordering-app-wlwn.onrender.com/chef', formDataToSend);
      console.log('Chef added successfully');
      alert('Chef added successfully');
      navigate('/chefCard')
      
      // You can redirect or perform any other action upon successful form submission
    } catch (error) {
      console.error('Error adding chef: ', error);
      alert('Error adding chef: ', error.message);
    }
  };



  return (
    <div className='form-bg'>
     <div>  <AdminNav/></div>
    
   
  <div className='background'style={{height:'100vh'}} >
    <div><Sidebar/></div>
   
    <div className='categoryform'>
    
    <form onSubmit={handleSubmit}>
    <h3 style={{ textAlign: 'center',color:'black' }}>chef Form</h3>
     
    
     <input className="chefname" type="text" name="chefname" placeholder="Add name" value={formData.chefname} onChange={handleChange} /> <br></br>

      <input className="image" type="file" name="image" onChange={handleChange} /> <br></br>
      <input  className="description"type="text" name="description" placeholder="description" value={formData.description} onChange={handleChange} /> <br></br>
      
      <button  className="submit"type="submit" style={{padding:'5px 13px 5px 13px',background:'#0d96f0',borderRadius:'1rem',border:'none',color:'white'}}>Submit</button>
    </form>
    </div>
    </div>
    </div>
   
  );
};

export default ChefForm;

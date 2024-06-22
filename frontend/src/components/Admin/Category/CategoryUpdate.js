import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css'
import AdminNav from '../../Navbar/AdminNav';

function CategoryUpdate() {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null); // Use null instead of empty string for file
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/getProductCategory/${id}`)
      .then((res) => {
        const categoryData = res.data; // Assuming the response contains the department data
        setCategory(categoryData.category);
        setName(categoryData.name);
        setImage(categoryData.image); // Assuming image is a URL or a base64 string
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // Move the declaration here
    formData.append('category', category);
    formData.append('name', name);
    formData.append('image', image); // Append the file object

    if (!formData.get('category') || !formData.get('name') || !formData.get('image')) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }

    axios.put(`http://localhost:4000/updateCategory/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Success");
        navigate("/categoryTable");
      })
      .catch((err) => {
        console.error("Error editing Category:", err);
      });
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Update image state with the selected file
  }

  return (
    <div className='form-bg'>
    <div>  <AdminNav/></div>
      
     
    <div className='background'style={{height:'100vh'}} >
      <div><Sidebar/></div>
     
      <div className='categoryform'>
       
        <form onSubmit={handleEdit}>
        <h3 style={{ textAlign: 'center', color: 'black' }}>Category Form</h3> <br></br>
          <input className="category" type="text" name="category" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} /> <br></br>
          <input className="name" type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> <br></br>
          <input className="image" type="file" name="image" onChange={handleImageChange} /> <br></br>

          <button className="submit" type="submit">Edit</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css'
import AdminNav from '../../Navbar/AdminNav';

function ChefUpdate() {
  const [chefname, setChefname] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/getUserChef/${id}`)
      .then((res) => {
        const chefData = res.data; // Assuming the response contains the department data
        setChefname(chefData.chefname);
        setDescription(chefData.description);
        setImage(chefData.image); // Assuming image is a URL or a base64 string
      
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    const formData = new FormData(); // Move the declaration here
    formData.append('chefname', chefname);
    formData.append('description', description);
    formData.append('image', image); // Append the file object

    if (!formData.get('chefname') || !formData.get('description') || !formData.get('image')) {
      alert("Please fill in all fields");
      return; // Exit early if any field is empty
    }

    axios.put(`http://localhost:4000/updateChef/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        alert("Success");
        navigate("/chefCard");
      })
      .catch((err) => {
        console.error("Error editing Chef:", err);
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
        <input className="chefname" type="text" name="chefname" placeholder="chefname" value={chefname} onChange={(e) => setChefname(e.target.value)} /> <br></br>
        

          <input className="description" type="text" name="description" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} /> <br></br>
          <input className="image" type="file" name="image" onChange={handleImageChange} /> <br></br>

          <button className="submit" type="submit">Edit</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default ChefUpdate;

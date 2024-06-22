
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NAV from '../../Navbar/NAV';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css'
import { Link } from 'react-router-dom';
import AdminNav from '../../Navbar/AdminNav';



function CategoryTable() {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:4000/getCategory")
      .then((res) => {
        console.log("Data received:", res.data);
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/deleteCategory/${id}`)
      .then((res) => {
        console.log("Category deleted");
        // Update the state after deletion
        setCategories(categories.filter(category => category._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
        // Optionally, you can display an error message to the user
        // alert("Error deleting department. Please try again later.");
      });
  }
  


  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      <div>  <AdminNav/></div>
     <div><Sidebar/></div>
      
     
    <div className='background' style={{height:'100%'}} >

      
      <div>
      <table className="table">
        
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <td style={{textTransform:'uppercase'}}><img style={{height:'100px',width:'100px',objectFit:'contain',borderRadius:'0.5rem'}} src={`http://localhost:4000/${category.image}`} alt={`Category ${category.name}`} /></td>
              <td style={{textTransform:'uppercase',fontWeight:'550'}}><p style={{fontSize:"13px"}} >{category.name}</p></td>
              <td style={{textTransform:'uppercase',fontWeight:'550'}}><p  style={{fontSize:"13px"}}>{category.category}</p></td>
             
             
              <td> <Link to={`/categoryUpdate/${category._id}`}><button variant="primary" style={{padding:'5px 13px 5px 13px',background:'#0d96f0',borderRadius:'1rem',border:'none',color:'white'}}>Update</button></Link></td>
              <td> <button onClick={() => handleDelete(category._id)} style={{padding:'5px 13px 5px 13px',background:'red;',borderRadius:'1rem',border:'none',color:'white',backgroundColor:'#ed0101'}} >Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>


    </div>
  </div>
);
}


export default CategoryTable;

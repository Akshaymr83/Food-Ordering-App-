// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import NAV from '../../Navbar/NAV';
// import Sidebar from '../Sidebar/Sidebar';
// import '../Category/category.css'
// import AdminNav from '../../Navbar/AdminNav';

// function FoodUpdate() {
 
//   const [foodname, setFoodName] = useState('');
//   const [image, setImage] = useState(null); 
//   const [description, setDescription] = useState('');
//   const [price, setPrice] = useState('');
//   const [category ,setCategory] =useState('')
//   const [availabilty ,setAvailability] =useState('')// Use null instead of empty string for file
//   const { id } = useParams();
//   const navigate = useNavigate();


//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:4000/categoryName')
//       .then((res) => {
//         setCategories(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     axios.get(`http://localhost:4000/getUserFood/${id}`)
//       .then((res) => {
//         const categoryData = res.data; // Assuming the response contains the department data
//         setFoodName(categoryData.foodname);
//         setDescription(categoryData.description);
//         setImage(categoryData.image);
//         setPrice(categoryData.price);
//         setCategory(categoryData.category)
//         setAvailability(categoryData.availabilty)// Assuming image is a URL or a base64 string
      
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);


//   const handleEdit = (e) => {
//     e.preventDefault();
  
//     // Check if any field is empty
//     if (!foodname || !description || !price || !category || !availabilty) {
//       alert("Please fill in all fields");
//       return;
//     }
  
//     // Check if the image is not selected
//     if (!image) {
//       alert("Please select an image");
//       return;
//     }
  
//     // Check if the category is selected
//     if (!category) {
//       alert("Please select a category");
//       return;
//     }
  
//     // Create a FormData object and append form data
//     const formData = new FormData();
//     formData.append('foodname', foodname);
//     formData.append('description', description);
//     formData.append('image', image);
//     formData.append('price', price);
//     formData.append('category', category);
//     formData.append('availabilty', availabilty);
  
//     axios.put(`http://localhost:4000/updateFood/${id}`, formData)
//       .then((res) => {
//         console.log(res.data);
//         alert("Success");
//         navigate("/foodTable");
//       })
//       .catch((err) => {
//         console.error("Error editing Food:", err);
//       });
//   }
  
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]); // Update image state with the selected file
//   }

//   return (
//     <div className='form-bg'>
//     <div>  <AdminNav/></div>
      
     
//     <div className='background'style={{height:'100vh'}} >
//       <div><Sidebar/></div>
     
//       <div className='categoryform'>
       
//         <form onSubmit={handleEdit}>
//         <h3 style={{ textAlign: 'center', color: 'black' }}>Category Form</h3> <br></br>
//           <input className="foodname" type="text" name="category" placeholder="foodname" value={foodname} onChange={(e) => setFoodName(e.target.value)} /> <br></br>
//           <input className="description" type="text" name="description" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} /> <br></br>
//           <input className="image" type="file" name="image" onChange={handleImageChange} /> <br></br>
//           <input className="price" type="number" name="price" placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)} /> <br></br>
//           <select
//               name="category"
//               value={category}
//               onChange={(e)=>setCategory(e.target.value)}
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat._id} value={cat.category}>
//                   {cat.category}
//                 </option>
//               ))}
//             </select>
//             <br />
         

//           <button className="submit" type="submit">Edit</button>
//         </form>
//       </div>
//       </div>
//     </div>
//   );
// }

// export default FoodUpdate;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from '../../Navbar/AdminNav';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css';

function FoodUpdate() {
  const [foodname, setFoodName] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState(''); // Added availability state
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/getUserFood/${id}`)
      .then((res) => {
        setFoodName(res.data.foodname);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setCategory(res.data.category);
        setAvailability(res.data.availability); // Set availability from fetched data
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:4000/categoryName')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('foodname', foodname);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('availability', availability); // Append availability to formData

      if (image) {
        formData.append('image', image);
      }

      await axios.put(`http://localhost:4000/updateFood/${id}`, formData);
      console.log('Food updated successfully');
      alert('Food updated successfully');
      navigate('/foodTable');
    } catch (error) {
      console.error('Error updating Food: ', error);
      alert('Error updating Food: ', error.message);
    }
  };

  return (
    <div className='form-bg'>
      <AdminNav />
      <div className='background' style={{ height: '100vh' }}>
        <Sidebar />
        <div className='categoryform'>
          <form onSubmit={handleSubmit}>
            <h3 style={{ textAlign: 'center' }}>Food Update Form</h3>
            <input
              className="foodname"
              type="text"
              name="foodname"
              placeholder="Update foodname"
              value={foodname}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <br />
            <input
              className="image"
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <br />
            <input
              className="description"
              type="text"
              name="description"
              placeholder="Update description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <input
              className="price"
              type="number"
              name="price"
              placeholder="Update price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.category}>
                  {cat.category}
                </option>
              ))}
            </select>
            <br />
            <select
              name="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="">Select Availability</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            <br />
            <button
              className="submit"
              type="submit"
              style={{
                padding: '5px 13px 5px 13px',
                background: '#0d96f0',
                borderRadius: '1rem',
                border: 'none',
                color: 'white'
              }}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FoodUpdate;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import NAV from '../../Navbar/NAV';
// import Sidebar from '../Sidebar/Sidebar';
// import '../Category/category.css'
// import { Link } from 'react-router-dom';
// import AdminNav from '../../Navbar/AdminNav';

// function FoodTable() {
//   const [foods, setFoods] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:4000/categoryName')
//       .then((res) => {
//         setCategories(res.data);
//       })
//       .catch((err) => console.log("Error fetching categories:", err)); // Log error if fetching categories fails
//   }, []);

//   useEffect(() => {
//     axios.get("http://localhost:4000/getFood")
//       .then((res) => {
//         console.log("Data received:", res.data);
//         setFoods(res.data.foods);
//       })
//       .catch((err) => {
//         console.log("Error fetching data:", err);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:4000/deleteFood/${id}`)
//       .then((res) => {
//         console.log("Food deleted");
//         // Update the state after deletion
//         setFoods(foods.filter(food => food._id !== id));
//       })
//       .catch((err) => {
//         console.error("Error deleting food:", err);
       
//       });
//   }

//   return (
//     <div style={{ fontFamily: "Poppins, sans-serif" ,height:'100%'}}>
//        <div>  <AdminNav/></div>
//       <div><Sidebar /></div>
//       <div className='background' style={{height:'100%'}}>
//         <table id='table' className="table">
//           <thead>
//             <tr>
//               <th scope="col">Food</th>
//               <th scope="col">Name</th>
//               <th scope="col">Description</th>
//               <th scope="col">Price</th>
//               <th scope="col">Category</th>
//               <th scope="col">Availability</th>
//               <th scope="col">Edit</th>
//               <th scope="col">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {foods.map((food, index) => (
//               <tr key={index}>
//                 <td style={{ textTransform: 'uppercase' }}><img style={{ height: '100px', width: '100px', objectFit: 'contain', borderRadius: '0.5rem' }} src={`http://localhost:4000/${food.image}`} alt={`Food ${food.foodname}`} /></td>
//                 <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }} >{food.foodname}</p></td>
//                 <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.description}</p></td>
//                 <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.price}</p></td>
//                 <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.category}</p></td>
//                 <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.availability}</p></td>
//                 <td> <Link to={`/foodUpdate/${food._id}`}><button variant="primary" style={{ padding: '5px 13px 5px 13px', background: '#0d96f0', borderRadius: '1rem', border: 'none', color: 'white' }}>Update</button></Link></td>
//                 <td> <button onClick={() => handleDelete(food._id)} style={{ padding: '5px 13px 5px 13px', borderRadius: '1rem', border: 'none', color: 'white', backgroundColor: '#ed0101' }} >Delete</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default FoodTable;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNav from '../../Navbar/AdminNav';
import Sidebar from '../Sidebar/Sidebar';
import '../Category/category.css';

function FoodTable() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/getFood')
      .then((res) => {
        console.log("Data received:", res.data);
        setFoods(res.data.foods);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/deleteFood/${id}`)
      .then((res) => {
        console.log("Food deleted");
        setFoods(foods.filter(food => food._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting food:", err);
      });
  }

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", height: '100%' }}>
      <div> <AdminNav /></div>
      <div><Sidebar /></div>
      <div className='background' style={{ height: '100%' }}>
        <table id='table' className="table">
          <thead>
            <tr>
              <th scope="col">Food</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Availability</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={index}>
                <td style={{ textTransform: 'uppercase' }}><img style={{ height: '100px', width: '100px', objectFit: 'contain', borderRadius: '0.5rem' }} src={`http://localhost:4000/${food.image}`} alt={`Food ${food.foodname}`} /></td>
                <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.foodname}</p></td>
                <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.description}</p></td>
                <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.price}</p></td>
                <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.category}</p></td>
                <td style={{ textTransform: 'uppercase', fontWeight: '550' }}><p style={{ fontSize: "13px" }}>{food.availability ? 'Available' : 'Not Available'}</p></td>
                <td><Link to={`/foodUpdate/${food._id}`}><button style={{ padding: '5px 13px', background: '#0d96f0', borderRadius: '1rem', border: 'none', color: 'white' }}>Update</button></Link></td>
                <td><button onClick={() => handleDelete(food._id)} style={{ padding: '5px 13px', borderRadius: '1rem', border: 'none', color: 'white', backgroundColor: '#ed0101' }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FoodTable;


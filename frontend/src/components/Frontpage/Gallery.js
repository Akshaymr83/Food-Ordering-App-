import React, { useEffect, useState } from 'react';
import axios from 'axios';
import menu from '../assets/food_2.jpg';

function Gallery({ setSelectedCategory }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // axios.get("https://food-ordering-app-wlwn.onrender.com/getCategory")
        axios.get(`${process.env.REACT_APP_API_URL}/getCategory`)
            .then((res) => {
                console.log("Data received:", res.data);
                setCategories(res.data.categories);
            })
            .catch((err) => {
                console.log("Error fetching data:", err);
            });
    }, []);

    const handleClick = (category) => {
        setSelectedCategory(category); // Update the selected category
    };

    return (

<div className="gallary" id="Gallary">
<h1>Our<span>Gallery</span></h1>

<div className="gallary_image_box">
    
    <div onClick={() => handleClick("All")} className="gallary_image">
        <div style={{ height: '100%', width: '100%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ width: '100%', height: 'auto' }} src={menu} alt={`All Categories`} />
            <div style={{ padding: '1rem', color: 'white' }}> <h5>All</h5> </div>
        </div>
    </div>

    {/* Categories */}
    {categories.map((category, index) => (
        <div onClick={() => handleClick(category.category)} className="gallary_image" key={index}>
            <div style={{ height: '100%', width: '100%', display: "flex", alignItems: 'center', flexDirection: 'column' }}>
                {/* <img style={{ width: '100%', height: 'auto' }} src={`https://food-ordering-app-wlwn.onrender.com/${category.image}`} alt={`Category ${category.category}`} /> */}
                <img style={{ width: '100%', height: 'auto' }} src={`${process.env.REACT_APP_API_URL}/${category.image}`} alt={`Category ${category.category}`} />
                <div style={{ padding: '1rem', color: 'white' }}> <h5>{category.category}</h5> </div>
            </div>
        </div>
    ))}
</div>
</div>
);
}


export default Gallery;
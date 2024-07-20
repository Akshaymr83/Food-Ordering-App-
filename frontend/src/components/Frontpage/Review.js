import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './reviewForm';
import { useParams } from 'react-router-dom';

function Review() {
  const { id } = useParams()
  const [reviews, setReviews] = useState([]);
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

  useEffect(() => {
    axios.get("http://localhost:4000/getReview")
      .then((res) => {
        console.log("Data received:", res.data);
        setReviews(res.data.reviews); // Assuming 'reviews' is an array inside the response data
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);

  return (
    <section style={{  paddingBottom: '10%', height: '100%' }}>
   

      <div className="review" id="Review">
        <h1 style={{paddingBottom:'13%'}}>Customer<span>Review</span></h1>
        <br></br>
        <ReviewForm/>
        <div className="review_box">
          {Array.isArray(reviews) && reviews.map((review, index) => (
            <div className="review_card" key={index}>
              <div className="review_profile">
                <img src={`http://localhost:4000/${review.image}`} alt={`Customer ${review.customer}`} />
              </div>
              <div className="review_text">
                <h2 className="name">{review.review}</h2>
                <div className="review_icon">
                  {/* Add your rating icons here */}
                </div>
                <div style={{overflow:'hidden'}}  className="review_social">
                <p >{review.description}</p>
                  {/* Add your social icons here */}
                </div>
                {/* <b><p style={{textTransform:'uppercase'}}>{reviewformData.name}</p></b> */}
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Review;

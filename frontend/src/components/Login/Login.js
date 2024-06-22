import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const login = async () => {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/login', user);
      setLoading(false);

      // const userData = {
      //   name: response.data.name,
      //   token: response.data.token,
      // };

      localStorage.setItem('currentUser', JSON.stringify(response.data));
      console.log('Login successful', response.data);

      // Check if the user is an admin
      if (response.data.isAdmin) {
        navigate('/admin/' + response.data._id); // Navigate to admin page
      } else {
        navigate('/frontpage/' + response.data._id); // Navigate to frontpage for regular users
      }

    } catch (err) {
      console.error('Login error:', err);

      if (err.response && err.response.status === 401) {
        toast.error('Invalid email or password. Please try again.'); // Display toastify error message for incorrect password
      } else {
        toast.error('An error occurred while logging in.'); // Display toastify error message for other login errors
      }

      setLoading(false);
    }
  };

  return (
    <div id="backgroundLogin">
      <ToastContainer /> {/* Add this line */}
      {loading && <p>Loading...</p>}
      <div id="containerlogin" className="container-fluid d-flex justify-content-center align-items-center">
        {!loading && (
          <div id="blurbg" className="content-wrapper" style={{ display: 'flex', flexDirection: 'row', padding: '4rem', borderRadius: '1rem', marginTop: '10%', width: '380px', boxShadow: '4px 6px 10px 1.5px' }}>
            <div>
              <form className="loginform" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <h3 className="text-center" style={{ fontWeight: "600" }}>LOGIN</h3>
                <br />
                <input className="loginput" type="email" placeholder="enter your email" autoComplete="off" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <input className="loginput" placeholder="enter your password" type="password" autoComplete="off" name="password"    value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
               
                <button id="loginbutton" type="button" style={{ padding: '5px 13px 5px 13px', background: '#0d96f0', borderRadius: '1rem', border: 'none', color: 'white' }} onClick={login}>Login</button>

              </form>
             
              <Link
              to="/"
              style={{ color: "blue", textAlign: "center", textDecoration: "none" }}
            >
              <p>New Member ? / Signup</p>
            </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;



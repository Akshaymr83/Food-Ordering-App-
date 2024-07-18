
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../Frontpage/frontpage.css"

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
 
  const navigate = useNavigate(); // Get the navigate function from React Router
 
  const register = async () => {
    if(password.length < 7){
      toast.error('Password must be at least 7 characters long'); // Display toast for short password
      return;

    }
    if (password === confirmPassword) {

      const user = {
        name,
        email,
        password,
      };
  
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:4000/register', user);
        setLoading(false);
        setSuccess(true);
  
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
  
        // Show success alert message
        window.alert('Signup Successfully, Login with your Email ID');    
     
        console.log('Registration successful', response.data);
        navigate('/login'); 
      } catch (error) {
        console.error('Registration error:', error.response.data);
        setLoading(false);
        setError('Registration failed. Please try again.'); // Set error message
      }
    } else {
      toast.warning('password Doesnt match'); // Display toast for password mismatch
    }
  };
 
  
  return (
    <div id="backgroundSignup">
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {loading }
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Render error message */}
      <div className="signupcontainer d-flex justify-content-center align-items-center flex-wrap">
        <div className="content-wrapper" id="signupcontent-wrapper"  style={{width:'30%',marginTop:'6%'}}>
          <div id="blurbg" className="signupcontainer2 " style={{display:'flex',flexDirection:'column',padding:'2rem',borderRadius:'1rem',marginTop:'13%',boxShadow:'4px 6px 10px 1.5px',alignItems:'center'}}>
            <form  style={{display:'flex',flexDirection:'column',alignItems:'center'}} >
              <h3 className="text-center" style={{fontWeight:"600"}}>Register</h3>
              <br></br>
              <div className="form-group" >
                <input
                  className="loginput"
                  type="text"
                  autoComplete="off"
                  name="name"
                  value={name}
                  placeholder="Enter Your name"
                  onChange={(e) => setName(e.target.value)}
                  style={{paddingLeft:'20px'}}
                />
              </div>
              <br></br>
              <div className="form-group">
                <input
                  className="loginput"
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{paddingLeft:'20px'}}
                />
              </div>
              <br></br>
              <div className="form-group" style={{ position: 'relative' }}>
                <input
                  className="loginput"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{paddingLeft:'20px'}}
                />
                <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '6px', cursor: 'pointer' }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <br></br>
              <div className="form-group" style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="loginput"
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '6px', cursor: 'pointer' }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <br></br>
              <div className="text-center">
                <button id="loginbutton" type="button" style={{padding:'5px 13px 5px 13px',background:'#0d96f0',borderRadius:'1rem',border:'none',color:'white'}}  onClick={register}>
                  Register
                </button>
              </div>
            </form>
            <p style={{textAlign:'center'}}> 
              <b>Already have an account?</b>
            </p>
            <Link
              to="/login"
              style={{ color: "blue", textAlign: "center", textDecoration: "none" }}
            >
              <p>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
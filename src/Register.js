import React, { useState } from 'react'; 
import apple from './assets/pineapple.jpg';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const errors = {};

    //Validate name format
    if (!formData.fname) {
      errors.fname = 'Username is required';
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    // Validate password criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    // Set errors or submit form
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      // Form submission logic (e.g., submit to backend)
      setErrors({});
      console.log('Form submitted:', formData);
      navigate('/Dashboard');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='container'>

      <img class="center" src={apple} alt="pineapple" />
      <h1>Sign up for an account</h1>
      
      <div className="abc">

      <label for="fname" className="text1">First name</label> <br></br>
      <input type="text" id="fname" name="fname" value={formData.fname} onChange={handleChange} required/>
      {errors.fname && <div style={{ color: 'red' }}>{errors.fname}</div>}


      <br></br>

      <label for="email" className="text2">Email Address</label> <br></br>
      <input type="text" id="email" name="email" value={formData.email} onChange={handleChange}/>
      {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

      <br></br>

      <label for="pass" className="text3">Password</label> <br></br>
      <input type={showPassword ? "text" : "password"} id="pass" name="password" value={formData.password} onChange={handleChange} minLength="8" required/>
      {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}

      <br></br>

      <button id="a" type="button" onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"} Password
      </button>

      <br></br>

      <input type="submit" id="register" value="Register"  onClick={handleSubmit} />

      <p>Already have an account? <strong><Link to="/Login" style={{textDecoration:"none",color:"green"}}>Sign in here!</Link></strong></p>
      </div>

    </div>
  );
};

export default Register;

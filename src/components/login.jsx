import React from 'react'
import "../App.css"
import {useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"



function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => { 
    try {
      const response = await fetch("http://localhost:3000/", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });
  
      const result = await response.json();  // Parse JSON response
      console.log('📤 Data sent to server:', data);
      console.log('📥 Server response:', result);
  
      if (response.ok) {
        console.log("✅ Login successful! Navigating to /home");
        navigate('/home');  // Navigate to home page
      } else {
        console.log("❌ Login failed! Stay on the same page.");
        // You can show an error message here if needed
      }
  
    } catch (error) {
      console.error('❌ Error during login:', error);
    }
  };
  

  return (
    <div>
      <div className="Maindiv">
        <div className="Form">
          <h3>Login Form</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login">
              <div className="login-form">
                <label>User Name or Email</label>
                <input
                  {...register('username', {
                    required: 'Username is required', 
                    minLength: {
                      value: 4,
                      message: 'Min length should be 4 characters',
                    },
                    maxLength: {
                      value: 40,
                      message: 'Max length should be 40 characters',
                    },
                  })}
                  type="text"
                  name="username"
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                />
                {errors.username && <p className="error">{errors.username.message}</p>}
              </div>

              <div className="login-form">
                <label>Password:</label>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 4,
                      message: 'Min length should be 4 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: 'Max length should be 20 characters',
                    },
                  })}
                  type="password"
                  name="password"
                  className={`input-field ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}
              </div>
            </div>
            <div className="login-form" style={{ marginTop: '20px' }}>
              <p>
                Don't have any Account? <span onClick={() => navigate('/register')} >Click to Register</span>
              </p>
            </div>

            <button type="submit" className="custom-button btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

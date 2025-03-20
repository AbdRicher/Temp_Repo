import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => { 
    try {
      const response = await fetch("http://localhost:3000/register", 
        { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
      });
  
      const result = await response.text(); 
      console.log('Data sent to server:', data);
      console.log('Server response:', result);
  
      navigate('/'); 
  
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle errors appropriately (e.g., display error message)
    }
  };
  
  
  const texts = [
    "Welcome!",
    "React Developer",
    "Creative Coder",
    "Web Developer",
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = isDeleting ? 50 : 100;

  useEffect(() => {
    const handleTyping = setTimeout(() => {
      const currentText = texts[index];
      setText(
        isDeleting
          ? currentText.substring(0, text.length - 1)
          : currentText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === currentText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    }, speed);

    return () => clearTimeout(handleTyping);
  }, [text, isDeleting, index]);

  return (
    <div className="Maindiv">
    <div className="sidecontent">
      <h2 style={{ fontFamily: "monospace", textAlign: "center" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque velit
        dolorum dicta? dolorum dicta?
        <span style={{ color: "red", fontFamily: "monospace" }}> {text}</span>
        <span style={{ animation: "blink 1s infinite" }}>|</span>
      </h2>
    </div>
    <div className="Form">
      <h3>Registration Form</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <div className="form-group">
            <label>First Name:</label>
            <input
              {...register('firstname', {
                required: 'First name is required',
                minLength: {
                  value: 4,
                  message: 'Min length should be 4 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Max length should be 20 characters',
                },
              })}
              type="text"
              name="firstname" 
              className={`input-field ${errors.firstname ? 'input-error' : ''}`} 
            />
            {errors.firstname && <p className="error">{errors.firstname.message}</p>}
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              {...register('lastname', {
                required: 'Last name is required',
                minLength: {
                  value: 4,
                  message: 'Min length should be 4 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Max length should be 20 characters',
                },
              })}
              type="text"
              name="lastname"
              className={`input-field ${errors.lastname ? 'inpur-error' : ''}`} 
            />
            {errors.lastname && <p className="error">{errors.lastname.message}</p>}
          </div>
        </div>

        <div className="flex">
          <div className="form-group">
            <label>Birthday</label>
            <input
              type="date"
              name="birthday"
              className="input-field" 
            />
          </div>

          <div className="form-group radio-container">
            <label>Gender</label>
            <div className="flex1" style={{ gap: '40px' }}>
              <label className="flex1" style={{ gap: '5px' }}>
                <input 
                  {...register('gender', { required: 'Please select a gender' })}
                  type="radio" 
                  name="gender" 
                  value="Male" 
                />{' '}
                Male
              </label>
              <label className="flex1" style={{ gap: '5px' }}>
                <input
                  {...register('gender')}
                  type="radio"
                  name="gender"
                  value="Female"
                />{' '}
                Female
              </label>
            </div>
             {errors.gender && <p className="error">{errors.gender.message}</p>}
          </div>
        </div>

        <div className="flex">
        <div className="form-group">
   <label htmlFor="email">Email:</label>
   <input
     {...register('email', {
       required: 'Email is required',
       // ... other validation
     })}
     type="email"
     id="email"
     name="email" 
     className={`input-field ${errors.email ? 'input-error' : ''}`} 
   />
 </div>

       

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  
                  value: /^\d{11}$/, 
                  message: 'Invalid phone number (11 digits)',
                },
              })}
              type="text"
              name="phone"
              className={`input-field ${errors.phone ? 'error' : ''}`} 
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <select 
            {...register('subject', { required: 'Please select a subject' })}
            className={`custom-select input-field ${errors.subject ? 'input-error' : ''}`} 
            name="subject"
          >
            <option value="">Choose option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          {errors.subject && <p className="error">{errors.subject.message}</p>}
        
          <button type="submit" className="custom-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default Register;

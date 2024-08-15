import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import contactUsImage from '../assets/contactus.jpg'; // Use the import format

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(50, 'Name must be 50 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      subject: Yup.string()
        .max(100, 'Subject must be 100 characters or less')
        .required('Required'),
      message: Yup.string()
        .max(500, 'Message must be 500 characters or less')
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log('Form submitted:', values);
      alert('Thank you for contacting us! We will get back to you shortly.');
      resetForm(); // Clear the form after submission
    },
  });

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '50px',
    height: '100vh',
    backgroundColor: '#ffffff', // White background
    color: '#000000', // Black text
    fontFamily: "'Poppins', sans-serif",
  };

  const leftSectionStyle = {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f5f5f5',
    color: '#000000',
    borderRadius: '10px',
    marginRight: '50px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageContainerStyle = {
    width: '100%',
    maxWidth: '400px',
    marginBottom: '20px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  };

  const rightSectionStyle = {
    flex: 1,
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'red', // Red color
    textAlign: 'center',
  };

  const contactUsStyle = {
    fontSize: '64px',
    fontWeight: 'bold',
    color: 'red', // Red color
    textAlign: 'left',
    lineHeight: '1',
  };

  const descriptionStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '20px',
    color: '#000000',
    textAlign: 'center',
  };

  const smallTextStyle = {
    fontSize: '12px',
    color: '#666666',
    marginBottom: '30px',
    textAlign: 'center',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#000000',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #cccccc', // Border defined once
    borderRadius: '5px',
    backgroundColor: '#eeeeee',
    color: '#000000',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #cccccc', // Border defined once
    borderRadius: '5px',
    backgroundColor: '#eeeeee',
    color: '#000000',
    resize: 'none',
    height: '100px',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#ff4c00',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      {/* Left Section */}
      <div style={leftSectionStyle}>
        {/* Image Container */}
        <div style={imageContainerStyle}>
          <img 
            src={contactUsImage} 
            alt="Contact Us" 
            style={imageStyle}
          />
        </div>

        <h1 style={contactUsStyle}>Contact Us</h1>
        <p style={descriptionStyle}>
          If you have any inquiries, feel free to contact us.
        </p>
      </div>

      {/* Right Section */}
      <div style={rightSectionStyle}>
        <h2 style={titleStyle}>Send Us A Message</h2>
        <form onSubmit={formik.handleSubmit}>
          <div style={formGroupStyle}>
            <label htmlFor="firstName" style={labelStyle}>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              style={inputStyle}
              {...formik.getFieldProps('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.firstName}</div>
            ) : null}
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              style={inputStyle}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="subject" style={labelStyle}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              style={inputStyle}
              {...formik.getFieldProps('subject')}
            />
            {formik.touched.subject && formik.errors.subject ? (
              <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.subject}</div>
            ) : null}
          </div>

          <div style={formGroupStyle}>
            <label htmlFor="message" style={labelStyle}>Message</label>
            <textarea
              id="message"
              name="message"
              style={textareaStyle}
              {...formik.getFieldProps('message')}
            />
            {formik.touched.message && formik.errors.message ? (
              <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors.message}</div>
            ) : null}
          </div>

          <button type="submit" style={submitButtonStyle}>SEND MESSAGE</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

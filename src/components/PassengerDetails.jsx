import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../index.css";

const PassengerDetails = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      moreDetails: false,
      subscribe: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container">
      <header>
        <div className="route-info">
          <p>NAIROBI-WILSON → MOMBASA &nbsp;&nbsp; 06/08/2024 - 29/08/2024</p>
        </div>
      </header>
      <main>
        <div className="steps">
          <span className="step">Select Flights</span>
          <span className="step">Extras</span>
          <span className="step current-step">Passenger details</span>
          <span className="step">Payment</span>
        </div>
        <h1>Passenger details</h1>
        <p class="centered">
          Please enter names as they appear on passport or travel documentation.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="section-header">
            <span className="icon">&#128100;</span>
            <span className="section-title">Primary Contact</span>
            <span className="adult-info">Adult 1</span>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <select
              id="title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            >
              <option value="">Select</option>
              <option value="mr">Mr</option>
              <option value="ms">Ms</option>
              <option value="mrs">Mrs</option>
              <option value="dr">Dr</option>
            </select>
            {formik.touched.title && formik.errors.title ? (
              <div className="error">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="error">{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="error">{formik.errors.lastName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <div className="phone-input">
              <img src="./src/assets/KenyanFlag.jpg" alt="Kenya Flag" />
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+254"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
              />
            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="error">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="moreDetails"
              name="moreDetails"
              onChange={formik.handleChange}
              value={formik.values.moreDetails}
            />
            <label htmlFor="moreDetails">Add more details</label>
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              onChange={formik.handleChange}
              value={formik.values.subscribe}
            />
            <label htmlFor="subscribe">
              Subscribe to receive offers and more
            </label>
          </div>
          <button type="submit" className="submit-btn">
            Continue
          </button>
        </form>
      </main>
    </div>
  );
};

export default PassengerDetails;

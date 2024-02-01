import React, { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    const errors = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        errors[key] = `Please fill out ${key} field`;
      }
    });

    if (!formData.email.includes("@")) {
      errors.email = "Invalid email. Please check your email address.";
    }

    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      errors.phone =
        "Invalid phone number. Please enter a 10-digit phone number.";
    }

    const dobDate = new Date(formData.dob);
    const currentDate = new Date();

    if (isNaN(dobDate.getTime()) || dobDate >= currentDate) {
      errors.dob =
        "Invalid date of birth. Date of birth cannot be in the future.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
      setIsOpen(false);
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className="app">
      <h1>User Details Modal</h1>
      <button className="open-button" onClick={() => setIsOpen(true)}>
        Open Form
      </button>
      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form className="form">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <div className="error">{formErrors.username}</div>

              <label htmlFor="email">Email Address:</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="error">{formErrors.email}</div>

              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <div className="error">{formErrors.phone}</div>

              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
              <div className="error">{formErrors.dob}</div>

              <div className="submit-button-container">
                <button
                  className="submit-button"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

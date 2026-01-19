"use client";
import axios from "axios";
import { useState } from "react";
import { CButton, CSpinner } from "@coreui/react";
// import "@coreui/coreui/dist/css/coreui.min.css";

export default function RegistrationModule() {
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    // file: null,
  });
  console.log(formData);
  
  const [profilePic, setProfilePic] = useState(null); // Store the profile picture

  const [errorMessage, seterrorMessage] = useState({
    status: "",
    message: "",
  });

  const [loding, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProfilePic(URL.createObjectURL(files[0]));
      setFormdata({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormdata({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.append("username", formData.username);
    // data.append("email", formData.email);
    // data.append("password", formData.password);
    // if (formData.file) {
    //   data.append("file", formData.file); // Append the file to FormData
    // }

    setloading(true);
    try {
      const response = await axios.post("/api/registeruser", formData,{
        headers: {
          'Content-Type': 'application/json', // Content-Type for JSON data
        },
      });
      console.log("form data submit Successfully", response);
      console.log(response);

      seterrorMessage({
        status: response.status,
        message: "Register Successfull",
      });
    } catch (error) {
      console.log(error.response.data);

      seterrorMessage({
        status: error.status,
        message: error.response.data.message,
      });
    }
    setloading(false);
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center">Register Page</h1>
        <form onSubmit={handleSubmit} className="form-floating">
          <div className="row d-flex flex-column justify-content-center align-content-center">
            <div className="row">
              <div className="col">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                  className="form-control"
                />
              </div>
              <div className="col">
                <label> email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="form-control"
                />
              </div>
              <div className="col">
                <label> Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  className="form-control"
                />
              </div>
              <div
                onClick={() => document.getElementById("fileInput").click()} // Trigger file input when the image is clicked
                style={{
                  display: "inline-block",
                  borderRadius: "50%",
                  overflow: "hidden",
                  width: "70px", // Adjust size of the profile picture
                  height: "70px",
                  padding: "0",
                  cursor: "pointer", // Show hand cursor when hovering over the image
                  border: "2px solid #ccc", // Optional: Add a border
                }}
              >
                <img
                  src={profilePic || "/images/defaultimage.png"} // If no profile picture, show default image
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Ensure the image fits well within the circular container
                  }}
                />
              </div>
              <input
                id="fileInput"
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
                style={{ display: "none" }} // Hide the input element
              />
            </div>
            <div className="col d-flex justify-content-center mt-3">
              {loding ? (
                <CButton color="primary">
                  <CSpinner
                    as="span"
                    className="me-2"
                    size="sm"
                    variant="grow"
                    aria-hidden="true"
                  />
                  <span role="status">Loading...</span>
                </CButton>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
            </div>
            <p
              style={{ color: errorMessage.status === 201 ? "green" : "red" }}
              className="text-center mt-3"
            >
              {errorMessage.message}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

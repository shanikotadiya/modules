"use client";
import React, { useState } from "react";
import { CButton, CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import axios from "axios";
import dynamic from 'next/dynamic';

const useRouter = dynamic(() => import('next/router').then(mod => mod.useRouter), { ssr: false });

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/loginuser", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="form-floating w-100  d-flex justify-content-center align-items-center"
        >
          <div className="d-flex flex-column justify-content-center align-content-center w-50">
            <div className="col">
              <div className="col">
                <div className="row mb-3">
                  <label className="w-25"> email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    value={formData.email}
                    className="form-control w-75"
                  />
                </div>
              </div>
              <div className="col">
                <div className="row">
                  <label className="w-25"> Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    value={formData.password}
                    className="form-control w-75"
                  />
                </div>
              </div>
            </div>
            <div className="col d-flex justify-content-center mt-3">
              {loading ? (
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
              //   style={{ color: errorMessage.status === 201 ? "green" : "red" }}
              className="text-center mt-3"
            >
              {/* {errorMessage.message} */}
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

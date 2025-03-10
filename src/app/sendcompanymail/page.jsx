"use client";
import React, { useState } from "react";
import { CButton, CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import axios from "axios";
import dynamic from "next/dynamic";
import ExcelMode from "../component/ExcelMode";
import Toaster from "../sub-component/toaster";
const useRouter = dynamic(
  () => import("next/router").then((mod) => mod.useRouter),
  { ssr: false }
);

export default function Login() {
  const [formData, setFormData] = useState({
    to: "",
  });
  const [mode, setMode] = useState(true);
  const [toast, setToast] = useState({ status: false, message: "" });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/companymail", formData);
      setToast({ ...toast, status: true, message: res.data.message });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleModeChange = (event) => {
    setMode(event.target.value === "true"); // Convert "true"/"false" string to boolean
  };
  return (
    <>
      <Toaster toast={toast} setToast={setToast} />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              {/* Radio Buttons */}
              <div className="mb-3 text-center">
                <label className="fw-bold me-3">Send via:</label>

                <input
                  type="radio"
                  name="mail"
                  id="bymail"
                  value="true"
                  checked={mode === true}
                  onChange={handleModeChange}
                  className="me-1"
                />
                <label htmlFor="bymail" className="me-3">
                  Mail
                </label>

                <input
                  type="radio"
                  name="mail"
                  id="byexcel"
                  value="false"
                  checked={mode === false}
                  onChange={handleModeChange}
                  className="me-1"
                />
                <label htmlFor="byexcel">Excel</label>

                {/* Display the selected value */}
              </div>

              {/* Conditional Rendering for Mail or Excel Mode */}
              {!mode ? (
                <ExcelMode />
              ) : (
                <form onSubmit={handleSubmit} className="w-100">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-lg-7 col-md-12 col-sm-12">
                        <label htmlFor="email" className="form-label fw-bold">
                          Email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="to"
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              [e.target.name]: e.target.value,
                            }));
                          }}
                          value={formData.email}
                          className="form-control"
                          placeholder="Enter company email"
                          required
                        />

                        {/* Submit Button */}
                        <div className="text-center mt-3">
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
                              Send
                            </button>
                          )}
                        </div>

                        {/* Error Message */}
                        {/* {errorMessage && (
                  <p className={`text-center mt-3 ${errorMessage.status === 201 ? "text-success" : "text-danger"}`}>
                  {errorMessage.message}
                  </p>
                  )} */}
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

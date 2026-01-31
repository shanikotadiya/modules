"use client";

import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import Snackbar from "@mui/joy/Snackbar";
import DataTable from "react-data-table-component";
import Toaster from "../sub-component/toaster";

export default function Pagination() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [totaluser, setTotalUser] = useState(0);
  console.log(totaluser);
  const [loading, setloading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchUser);
  const [editUserData, setEditUserData] = useState({
    username: "",
    email: "",
  });
  const [deleteuserid, setDeleteUserId] = useState(null);
  const [toast, setToast] = useState({ status: false, message: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchUser);
    }, 500); // 500ms debounce delay
    return () => clearTimeout(timeout); // Cleanup previous timeout on new change
  }, [searchUser]);

  // Delete Data Request
  useEffect(() => {
    (async () => {
      if (deleteuserid) {
        try {
          const res = await axios.delete(`api/data?query=${deleteuserid}`);
          if (res.status == 200) {
            setDeleteUserId(null);
            setToast({ ...toast, status: true, message: res.data.message });
          }
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [deleteuserid]);

  // update Data Request
  const upDateData = async () => {
    try {
      const response = await axios.put("api/data", editUserData);
      setToast({ ...toast, status: true, message: response.data.message });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Fetch Data Request
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `/api/data?query=${searchUser}&page=${page}&limit=${limit}`
        );
        setUsers(res.data.data.users);
        setTotalPage(res.data.data.totalPages);
        setTotalUser(res.data.data.totalcount);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    })();
  }, [page, limit, debouncedSearch, deleteuserid]);

  const columns = [
    {
      name: "Id",
      selector: (_, index) => index + 1,
    },
    {
      name: "Name",
      selector: (row) => row.username,
      sortable: true,
      style: {
        textAlign: "center",
      },
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
          className="btn btn-outline-primary"
          onClick={() => {
            setEditUserData(row);
          }}
        >
          Edit
        </button>
      ),

      ignoreRowClick: true, // Prevent row click events from affecting the button
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          type="button"
          className="btn btn-danger "
          onClick={() => setDeleteUserId(row._id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        textAlign: "center", // Center align text in rows
        borderBottom: "1px solid #ddd",
        fontSize: "13px", // Set row font size
        fontFamily: "'Verdana',Sans-serif", // Change font family
        fontWeight: "400", // Normal text weight
      },
    },
    headCells: {
      style: {
        justifyContent: "center",
        display: "flex",
        fontWeight: "bold",
        borderLeft: "1px solid #ddd",
        borderRight: "1px solid #ddd",
        borderTop: "1px solid #ddd",
        backgroundColor: "#f1f1f1",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        display: "flex",
        borderLeft: "1px solid #ddd", // Border for left side of cells
        borderRight: "1px solid #ddd",
      },
    },
    table: {
      style: {
        position: "relative", // Needed for absolute positioning
        minHeight: "300px", // Set a minimum height
        display: "flex",
        flexDirection: "columns",
        justifyContent: "center",
        // maxHeight: "1000px", // Set a maximum height (optional)
      },
    },
  };

  return (
    <>
      <Toaster toast={toast} setToast={setToast} />
      <h1 className="text-center mt-3 mb-3">Employee data</h1>

      {loading ? (
        <div
          className="contaier d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <div className="d-flex flex-row w-50 mb-3">
            <label
              htmlFor=""
              className="w-25 me-2 p-0 text-center align-content-center rounded"
              style={{ backgroundColor: "#f1f1f1" }}
            >
              Search
            </label>
            <input
              type="text"
              name=""
              id=""
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className="form-control w-50"
            />
          </div>
          <DataTable
            columns={columns}
            data={users}
            fixedHeader
            fixedHeaderScrollHeight="300px"
            pagination
            paginationServer
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
            paginationComponentOptions={{
              noRowsPerPage: false,
          
            }}
            paginationTotalRows={totaluser}
            onChangePage={(page) => setPage(page)}
            onChangeRowsPerPage={(newPerPage) => setLimit(newPerPage)}
            highlightOnHover
            responsive
            style={{ width: "50%" }}
            customStyles={customStyles}
          />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <span>
              Page {page} of {totalPage}
            </span>
          </div>
        </div>
      )}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit User Data
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row pb-3 text-center">
                  <label className="w-25">Username</label>
                  <input
                    type="text"
                    className="form-control w-75"
                    name="username"
                    value={editUserData.username}
                    onChange={(e) => {
                      setEditUserData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="row text-center">
                  <label className="w-25">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control w-75"
                    value={editUserData.email}
                    onChange={(e) => {
                      setEditUserData((prev) => ({
                        ...prev,
                        [e.target.email]: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary w-25"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary w-25"
                onClick={upDateData}
                data-bs-dismiss="modal"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

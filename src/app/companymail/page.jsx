"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import Snackbar from "@mui/joy/Snackbar";
import Button from "@mui/joy/Button";
import DataTable from "react-data-table-component";

export default function Pagination() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const [totaluser, setTotalUser] = useState(0);
  const [searchUser, setSearchUser] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchUser);
  const [toast, setToast] = useState({ status: false, message: "" });
  const [isrefresh,setIsRefresh] = useState(false)
  const queryClient = useQueryClient();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchUser);
    }, 500); // 500ms debounce delay
    return () => clearTimeout(timeout); // Cleanup previous timeout on new change
  }, [searchUser]);


  // update Data Request
  const reSendMail = async ({ email }) => {
    const to = email;
    try {
      
      const response = await axios.post("api/companymail", { to });
      queryClient.invalidateQueries(["emails"]);
      setToast({ ...toast, status: true, message: response.data.message });
    } catch (error) {
      setToast({
        ...toast,
        status: true,
        message: error.response.data.message,
      });
    }
  };

  const OnDelete = async (row)=>{
     try {
          const res = await axios.delete(`api/companymail?query=${row?._id}`);
          if (res.status == 200) {
            setIsRefresh(!isrefresh)
            setToast({ ...toast, status: true, message: res.data.message });
          }
        } catch (error) {
          console.log(error);
        }
  }
  useEffect(()=>{
      setIsLoading(true)
       const fetchdata = async () => {
        const response = await axios.get(
          `/api/companymail?query=${searchUser}&page=${page}&limit=${limit}`
        );        
        setUsers(response.data.data.emails || []); // Ensure emails array is set
        setTotalPage(response.data.data?.totalpages || 1); // Default to 1 to avoid issues
        setTotalUser(response.data.data?.totalemail || 0);
      }
      setIsLoading(false)
      fetchdata();
  },[searchUser, page, limit, debouncedSearch, isrefresh])

  const columns = [
    {
      name: "Id",
      selector: (_, index) => index + 1,
      width: "10vh",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "date",
      selector: (row) => new Date(row.date).toLocaleDateString("en-GB"),
      sortable: true,
      width: "20vh",
    },
    {
      name: "Difference In day",
      selector: (row) => row.dateDifference,
      sortable: true,
      width: "20vh",
    },
    {
      name: "Resend",
      selector: (row) => (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => reSendMail(row)}
        >
          Send
        </button>
      ),
      sortable: true,
      width: "15vh",
    },
    {
      name: "Delete",
      selector: (row) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => OnDelete(row)}
        >
          Delete
        </button>
      ),
      sortable: true,
      width: "15vh",
    },
  ];
  const customStyles = {
    table: {
      style: {
        minHeight: "36vh", // Set minimum height
        border: "1px solid #ddd", // Apply border to entire table
        borderCollapse: "collapse", // Ensure borders collapse properly
        width: "100%",
        overflowX: "auto", // Allows horizontal scrolling on small screens
      },
    },
    headCells: {
      style: {
        border: "1px solid #ddd", // Apply border to header cells
        backgroundColor: "#f1f1f1",
        fontWeight: "bold",
        textAlign: "center",
        display: "flex", // Makes content align properly
        justifyContent: "center", // Centers text and buttons horizontally
        alignItems: "center", // Centers text and buttons vertically
        fontSize: "14px", // Adjusts font size for better visibility
      },
    },
    rows: {
      style: {
        border: "1px solid #ddd", // Apply border to each row
        fontSize: "13px",
        fontFamily: "'Verdana', Sans-serif",
        fontWeight: "400",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd", // Apply border to each cell
        textAlign: "center",
        display: "flex", // Makes content align properly
        justifyContent: "center", // Centers text and buttons horizontally
        alignItems: "center", // Centers text and buttons vertically
      },
    },
  };

  return (
    <>
      <Snackbar
        variant="soft"
        color="success"
        open={toast.status}
        onClose={() => setToast({ ...toast, status: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000} // Auto-hide after 3000ms (3 seconds)
        endDecorator={
          <Button
            onClick={() => setToast({ ...toast, status: false })}
            size="sm"
            variant="soft"
            color="success"
          >
            Dismiss
          </Button>
        }
      >
        {toast.message}
      </Snackbar>
      <h1 className="text-center mt-3 mb-3">Company Mail</h1>

      {isLoading ? (
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
          <div className="row mb-3">
            {/* Search Wrapper with Flexbox for Alignment */}
            <div className="col-12 col-sm-8 d-flex align-items-center gap-2">
              {/* Label Column */}
              <label
                className="px-3 py-2 rounded"
                style={{
                  backgroundColor: "#f1f1f1",
                  display: "inline-block",
                  minWidth: "80px",
                }}
              >
                Search
              </label>
              <div className="col col-sm-4 col-md-8 col-lg-3">
                {/* Search Input */}
                <input
                  type="text"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={users}
            fixedHeader
            fixedHeaderScrollHeight="35vh" // Adjusts height dynamically
            pagination
            paginationServer
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15]}
            paginationComponentOptions={{
              noRowsPerPage: false,
              disableNext: page >= totalPage, // Disable Next if on last page
              disablePrev: page === 1, // Disable Prev if on first page
            }}
            paginationTotalRows={totaluser}
            onChangePage={(page) => setPage(page)}
            onChangeRowsPerPage={(newPerPage) => setLimit(newPerPage)}
            highlightOnHover
            responsive
            style={{ width: "100%", minWidth: "600px" }} // Ensures good scaling
            customStyles={customStyles}
          />
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <span>
              Page {page} of {totalPage}
            </span>
          </div>
        </div>
      )}
      {/* <div
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
      </div> */}
    </>
  );
}

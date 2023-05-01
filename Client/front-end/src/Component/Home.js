import React, { useState, useEffect } from "react";
import { toast, Toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../Component/Home.css";

const Home = () => {
  const [getuserdata, setUserdata] = useState([]);
  const navigate = useNavigate();

  const DetailFunction = (id) => {
    navigate("/employee/detail/" + id);
  };
  const EditFunction = (id) => {
    navigate("/employee/edit/" + id);
  };

  const DeleteFunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`http://localhost:8002/delete-user/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          toast.success("Removed  successfully.");
          setTimeout(() => {
            window.location.reload();
          }, 500);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8002/get-users-data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setUserdata(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(getuserdata);

  return (
    <div className="mt-5">
      <div className="container">
        <div className="card-title">
          <h2>Employee Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn mt-2 mb-2">
            <Link to="/register" className="btn btn-primary">
              Add New (+)
            </Link>
          </div>

          <table class="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Job</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <tr>
                    <th scope="row">{id + 1}</th>
                    <td>{element.name}</td>
                    <td>{element.email}</td>
                    <td>{element.work}</td>
                    <td>{element.mobile}</td>
                    <td className="d-flex justify-content-between">
                      <Link to={`edit/${element.id}`}>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            EditFunction(element.id);
                          }}
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          DeleteFunction(element.id);
                        }}
                      >
                        Delete
                      </button>
                      <Link to={`detail/${element.id}`}>
                        {" "}
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            DetailFunction(element.id);
                          }}
                        >
                          Detail
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;

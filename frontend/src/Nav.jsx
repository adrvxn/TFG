import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Nav = () => {
  const userId = localStorage.getItem("user_id");
  const [usuario, setUsuario] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsuario = async () => {
      try {
        const res = await axios.get("http://localhost:8000/usuario");
        setUsuario(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsuario();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/usuarios/${userId}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details");
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);
  const handleLogout = () => {
    localStorage.removeItem("user_id");
    history.push("/login");
  };

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "100px",
          color: "black",
        }}
      >
        Error: {error}
      </div>
    );
  }
  return (
    <>
      <header>
        <div className="logo">
          <div className="imglogo">
            <h1>BA</h1>
          </div>
          <div className="textologo">
            <h1>Book Appointments</h1>
          </div>
        </div>
        <nav className="nav">
          <input type="checkbox" id="menu" />
          <label for="menu"> ☰ </label>
          <ul className="list-nav">
            <li className="nav-item nav-item_home active">
              <Link to="/index">
                <strong>Home</strong>
              </Link>
            </li>
            {/* Add Proveedor */}

            {userId === "9" && (
              <>
                <li className="nav-item nav-item_categories">
                  <Link to="/proveedor/add">
                    <strong>New Categories</strong>
                  </Link>
                </li>
                <li className="nav-item nav-item_categories">
                  <Link to="/usuario">
                    <strong>Show users</strong>
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item nav-item_account">
              <i className="fa-solid fa-user"></i>
              <strong>&nbsp;My account&nbsp;</strong>
              <i className="fa-solid fa-caret-down"></i>
              <ul>
                <li>
                  <Link to="/reservas">My dates</Link>
                </li>
                <li>
                  {userDetails ? (
                    <Link to={`/usuario/${userDetails.id_usuario}`}>
                      Configuration
                    </Link>
                  ) : (
                    <span>Loading...</span>
                  )}
                  {/* <a href="configuration.html">Configuration</a> */}
                </li>
                <li>
                  <Link to="#" onClick={handleLogout}>
                    LogOut
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Nav;

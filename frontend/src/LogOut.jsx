import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const history = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("user_id");
  //   history("/login");
  // };
  useEffect(() => {
    localStorage.removeItem("user_id");
    history("/login");
  }, [history]);

  return null;
  // return (
  //   <div>
  //     <h1>¿Seguro que deseas cerrar sesión?</h1>
  //     <button onClick={handleLogout}>Cerrar sesión</button>
  //     <Link to="/usuario">Volver a la página de usuario</Link>
  //   </div>
  // );
};

export default Logout;

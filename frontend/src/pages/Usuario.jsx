import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";
const Usuario = () => {
  const [usuario, setUsuario] = useState([]);
  const userId = localStorage.getItem("user_id");
  //Probando paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Usar este useeffect para el nav
  useEffect(() => {
    const fetchAllUsuario = async () => {
      try {
        const res = await axios.get("http://localhost:8000/usuario");
        setUsuario(res.data);
        //console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsuario();
  }, []);

  const handleDelete = async (id_usuario) => {
    const confirmUser = window.confirm(
      "Estas seguro de borrar este usuario?" + id_usuario
    );
    if (confirmUser) {
      const respuesta = await axios
        .delete(`http://localhost:8000/usuario/${id_usuario}`)
        .then((respuesta) => {
          console.log("Usuario eliminado correctamente:", respuesta.data);
          setUsuario(usuario.filter((user) => user.id_usuario !== id_usuario));
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      console.log("Operación cancelada correctamente.");
    }
  };
  //Paginacion
  const totalPages = Math.ceil(usuario.length / itemsPerPage);

  // Obtén los elementos para la página actual
  const currentItems = usuario.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //
  return (
    <div className="container">
      <section className="herolanding">
        <Nav />
        <div class="titlelanding">
          <h1>Show users</h1>
        </div>
      </section>
      <section className="containerMyCategories">
        {/* {usuario.map(user=>( */}
        {currentItems.map((user) => (
          <div className="category1" key={user.id_usuario}>
            <div className="filacategoria">
              <div class="imgcategory"><i class="fa-solid fa-user"></i></div>
              <div className="textcategory">
                <h2>
                  {user.nombre} {user.apellido}
                </h2>
                <p>{user.correo}</p>
              </div>
            </div>
            {userId === "9" && (
              <>
                <div className="btncategory">
                  <a
                    className="delete"
                    onClick={() => handleDelete(user.id_usuario)}
                  >
                    Borrar
                  </a>
                  <button className="btnregistro">
                    <Link to={`/usuario/${user.id_usuario}`}>
                      Actualizar Usuario
                    </Link>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        <br></br>
        
        {/* Paginación */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {/*Fin Paginación */}
      </section>
      {/* <button>
          <Link to="/add">Añadir nuevo Usuario</Link>
        </button>
        <button><Link to="/login">Login</Link></button>
        <br></br>
        <button>
          <Link to={"/proveedor"}>Mostrar proveedores</Link>
        </button>
        <button>
          <Link to={"/reservas"}>Mostrar mis reservas</Link>
        </button> */}
        <br></br>
        <Footer/>
    </div>
  );
};
export default Usuario;

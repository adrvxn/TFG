import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";
const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    const fetchAllReserva = async () => {
      try {
        let res;
        console.log("userId:", userId);
        if (userId === "9") {
          res = await axios.get("http://localhost:8000/reservas");
          console.log("DESDE SUPERADMIN:" + res.data);
        } else {
          res = await axios.get(
            `http://localhost:8000/reservas?userId=${userId}`
          );
        }
        console.log("res.data:", res.data);
        setReservas(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReserva();
  }, [userId]);
  const handleDelete = async (id_reserva) => {
    const confirmUser = window.confirm(
      "Estas seguro de borrar esta reserva?"
    );
    if (confirmUser) {
      await axios
        .delete(`http://localhost:8000/reservas/${id_reserva}`)
        .then((respuesta) => {
          setReservas(
            reservas.filter((user) => user.id_reserva !== id_reserva)
          );
          console.log("reservas eliminado correctamente:", respuesta.data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
      console.log("Operación cancelada correctamente.");
    }
  };
  const canUpdateReserva = (fechaCita) => {
    const now = new Date();
    const citaDate = new Date(fechaCita);
    const diffTime = citaDate - now;
    const diffHours = diffTime / (1000 * 60 * 60);
    return diffHours > 24;
  };
  return (
    <>
      <div className="container">
        <section className="herodates">
          <Nav />
          <div className="titledates">
          {userId === "9" ? (
            <h1>All reserves</h1>
          ) : (
            <h1>My reserves</h1>
          )}
          </div>
        </section>
        <section className="myCategories">
          <div className="containerMyCategories">
            {reservas.length === 0 ? (
              <h1 className="no-reserva">There are no reservations</h1>
            ) : (
              reservas.map((reserva) => (
                <div className="category1" key={reserva.id_reserva}>
                  <div className="filacategoria">
                    <div className="imgcategory"><i class="fa-regular fa-clock"></i></div>
                    <div className="textcategory">
                      <h3>{reserva.profesional}</h3>
                    </div>
                    <div className="fecha">
                      <h3>{new Date(reserva.fecha_cita).toLocaleString()}</h3>
                    </div>
                  </div>
                  
                  {userId === "9" ? (
                    <div className="btncategory">
                    <>
                    <button className="btnregistro" >
                      <Link  to={`/reservas/${reserva.id_reserva}`}>
                          Update Reserve
                        </Link>
                    </button>
                      
                        <a className="delete" onClick={() => handleDelete(reserva.id_reserva)}>
                          Delete &nbsp;<i className="fa-solid fa-trash-can"></i>
                        </a>
                    </>
                    </div>
                  ) : (
                    canUpdateReserva(reserva.fecha_cita) && (
                      <div className="btncategory">
                        <>
                          <Link className="btnregistro " to={`/reservas/${reserva.id_reserva}`}>
                           Update reserve
                          </Link>
                          <a className="delete" onClick={() => handleDelete(reserva.id_reserva)}>
                            Delete &nbsp;<i className="fa-solid fa-trash-can"></i>
                          </a>
                        </>
                  </div>
                    )
                  )}
                </div>
              ))
            )}
          </div>
          <Footer />
        </section>
      </div>
    </>
  );
};
export default Reservas;

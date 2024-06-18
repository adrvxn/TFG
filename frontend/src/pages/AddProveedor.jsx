import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../Nav";
import Footer from "../Footer";

const AddProveedor = () => {
  const [proveedor, setProveedor] = useState({
    nombre_proveedor: "",
    tipo_servicio: "",
    profesional: "",
    direccion: "",
    telefono: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const validatePhoneNum = (phone) => {
    const regex = /^(\+?34)?(6\d{2}|7[1-9]\d{1})\d{6}$/;
    return regex.test(phone);
  };
  const validateForm = () => {
    let formErrors = {};
    if (!proveedor.nombre_proveedor.trim())
      formErrors.nombre_proveedor = "El nombre del proveedor es obligatorio";
    if (!proveedor.tipo_servicio.trim())
      formErrors.tipo_servicio = "El tipo de servicio es obligatorio";
    if (!proveedor.profesional.trim())
      formErrors.profesional = "El campo de profesional es obligatorio";
    if (!proveedor.direccion.trim())
      formErrors.direccion = "La direccion que has introducido no es valida";
    if (!validatePhoneNum(proveedor.telefono))
      formErrors.telefono =
        "El número de telefono debe ser numérico y de longuitud 9";
    if (proveedor.telefono == "")
      formErrors.telefono = "El número de telefono es obligatorio";
    return formErrors;
  };
  const handleChanger = (e) => {
    setProveedor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
    try {
      await axios.post("http://localhost:8000/proveedor", proveedor);
      navigate("/index");
      console.log(proveedor);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  console.log(proveedor);
  return (
    <>
      <div className="container">
        <section className="heroreserv">
          <Nav />
          <div className="titledates">
            <h1>Add Categories</h1>
          </div>
        </section>
        <section className="containerReserv">
          <div className="reservform">
            <div className="imgconfi">
            <i class="fa-solid fa-briefcase"></i>
            </div>
            <div className="reservtext profile">
              <form className="form">
                <input
                  type="text"
                  placeholder="nombre_proveedor"
                  name="nombre_proveedor"
                  maxLength={50}
                  onChange={handleChanger}
                  required
                ></input>
                {error.nombre_proveedor && (
                  <p className="error">
                    {error.nombre_proveedor}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="tipo_servicio"
                  name="tipo_servicio"
                  maxLength={50}
                  onChange={handleChanger}
                  required
                ></input>
                {error.tipo_servicio && (
                  <p className="error">
                    {error.tipo_servicio}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="profesional"
                  name="profesional"
                  maxLength={100}
                  onChange={handleChanger}
                  required
                ></input>
                {error.profesional && (
                  <p className="error">
                    {error.profesional}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="direccion"
                  name="direccion"
                  maxLength={100}
                  onChange={handleChanger}
                  required
                ></input>
                {error.direccion && (
                  <p className="error">
                    {error.direccion}
                  </p>
                )}

                <input
                  type="tel"
                  placeholder="telefono"
                  name="telefono"
                  minLength={9}
                  maxLength={9}
                  onChange={handleChanger}
                ></input>
                {error.telefono && (
                  <p className="error">
                    {error.telefono}
                  </p>
                )}
                <button class="btnregistro" onClick={handleClick}>Añadir Proveedor</button>
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default AddProveedor;

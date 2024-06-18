import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";

const UpdateProveedor = () => {
  const { id } = useParams();
  const [proveedores, setProveedores] = useState({
    nombre_proveedor: "",
    tipo_servicio: "",
    profesional: "",
    direccion: "",
    telefono: 0,
  });
  // const [proveedores,setProveedores] =useState({});
  const [error, setError] = useState(false);
  //con patch
  const [modifiedFields, setModifiedFields] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  // const usuarioId = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/proveedor/update/${id}`
        );
        const userData = response.data;
        if (Array.isArray(userData)) {
          setProveedores(userData[0]);
        } else {
          setProveedores(userData);
        }
        console.log(userData);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };
    fetchProveedores();
  }, [id]);

  const handleChanger = (e) => {
    //añadido
    const { name, value } = e.target;
    setProveedores((prevProveedores) => ({
      ...prevProveedores,
      [name]: value,
    }));
    //Con patch
    setModifiedFields((prevModifiedFields) => ({
      ...prevModifiedFields,
      [name]: true,
    }));
    //setProveedores(prev =>({...prev, [e.target.name]: e.target.value}));Anteriormente estaba asi
  };

  const validatePhoneNum = (phone) => {
    const regex = /^(\+?34)?(6\d{2}|7[1-9]\d{1})\d{6}$/;
    return regex.test(phone);
  };
  // const handleValidation = () => {
  //     const newErrors = {};
  //     if (!validatePhoneNum(proveedores.telefono)) {
  //         newErrors.telefono = "Teléfono invalido";
  //     }
  //     setError(newErrors);
  //     return Object.keys(newErrors).length === 0;
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    // if (!handleValidation()) {
    //     return;
    // }
    //Con patch
    const updatedFields = Object.keys(modifiedFields).reduce((acc, field) => {
      if (modifiedFields[field]) {
        acc[field] = proveedores[field];
      }
      return acc;
    }, {});
    console.log("Updated Fields: ", updatedFields);
    try {
      // await axios.put("http://localhost:8000/usuario/"+usuarioId, usuario);
      //Con patch
      await axios.patch(`http://localhost:8000/proveedor/${id}`, updatedFields);
      navigate("/index");
      console.log("Proveedor editado Correctamente!");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  console.log(proveedores);
  return (
    <>
      <div className="container">
      <section className="heroreserv">
            <Nav/>
            <div className="titledates">
                <h1>Update Categories</h1>
            </div>
        </section>
        <section className="containerReserv">
            <div className="reservform">
                <div className="imgconfi"><i class="fa-solid fa-briefcase"></i></div>
                <div className="reservtext profile">



                <form className="form">
          <h1>Actualizar proveedor</h1>
          <input
            type="text"
            value={proveedores.nombre_proveedor}
            placeholder="nombre_proveedor"
            name="nombre_proveedor"
            maxLength={50}
            onChange={handleChanger}
          ></input>
          <input
            type="text"
            value={proveedores.tipo_servicio}
            placeholder="tipo_servicio"
            name="tipo_servicio"
            maxLength={50}
            onChange={handleChanger}
          ></input>
          <input
            type="text"
            value={proveedores.profesional}
            placeholder="profesional"
            name="profesional"
            maxLength={100}
            onChange={handleChanger}
          ></input>
          <input
            type="text"
            value={proveedores.direccion}
            placeholder="direccion"
            name="direccion"
            maxLength={100}
            onChange={handleChanger}
          ></input>
          <input type="tel" value={proveedores.telefono} placeholder="telefono" name="telefono" minLength={9} maxLength={9} onChange={handleChanger}></input>
          {error.dni && <span className="error">{error.dni}</span>}
          <button class="btnregistro" onClick={handleClick}>Actualizar Proveedor</button>
          {error && "Algo fallo!"}{" "}
          {/* <Link to="/proveedor">Volver a proveedores</Link> */}
        </form>


                </div>
                
            </div>
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default UpdateProveedor;

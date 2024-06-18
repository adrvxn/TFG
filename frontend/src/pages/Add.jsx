import axios from "axios";
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const Add = ()=>{
    const [usuario,setUsuario] =useState({
        nombre: "",
        apellido: "",
        correo: "",
        dni: "",
        contraseña: "",
    });
    const [error,setError] = useState(false)

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regEx.test(email);
    }
    const validateDNI = (dni) =>{
        const regEx = /^(\d{8})([A-Z])$/;
        return regEx.test(dni);
    }
    const validateForm = () =>{
        let formErrors = {};
        if (!usuario.nombre.trim()) formErrors.nombre = "Name is required";
        if (!usuario.apellido.trim()) formErrors.apellido = "Surname is required";
        if (!usuario.correo.trim()) formErrors.correo = "Email is required";
        if (!validateEmail(usuario.correo)) formErrors.correo = "Email is not valid";
        if (!validateDNI(usuario.dni)) formErrors.dni = "DNIis not valid";
        if (usuario.contraseña.length < 6) formErrors.contraseña = "The password must have at least 6 characters.";
        return formErrors;
    }
    const handleChanger = (e)=>{
        setUsuario(prev =>({...prev, [e.target.name]: e.target.value}));
        setError((prev) => ({ ...prev, [e.target.name]: "" }));
    }
    const handleClick = async (e) =>{
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);
            return;
        }
        try {
            await axios.post("http://localhost:8000/usuario", usuario);
            //Redirege a reservas
            navigate("/proveedor");
            console.log("Usuario Creado Correctamente")
            console.log(usuario)
        } catch (error) {
            console.log(error);
            setError((prev) => ({ ...prev, general: "Error al añadir el usuario" }));
            
        }
    }
    return(
      <>
      <form>
            <label for="reg-name">Name</label>
            <input type="text" placeholder="nombre" name="nombre" maxLength={50} onChange={handleChanger}></input>
            {error.nombre && <p className="error">{error.nombre}</p>}

            <label for="reg-name">Surnames</label>
            <input type="text" placeholder="apellido" name="apellido" maxLength={100} onChange={handleChanger}></input>
            {error.apellido && <p className="error">{error.apellido}</p>}

            <label for="reg-email">Email</label>
            <input type="email" placeholder="correo" name="correo" maxLength={50} onChange={handleChanger}></input>
            {error.correo && <p className="error">{error.correo}</p>}

            <label for="reg-dni">DNI</label>
            <input type="text" className="cl-validate-dni" placeholder="dni" name="dni" mLength={9} maxLength={9} onChange={handleChanger}></input>
            {error.dni && <p className="error">{error.dni}</p>}

            <label for="reg-password">Password</label>
            <input type="password" placeholder="contraseña" name="contraseña" maxLength={20} onChange={handleChanger}></input>
            {error.contraseña && <p className="error">{error.contraseña}</p>}

            {/* <button ><Link to={"/usuario"}>Volver a usuario</Link></button> */}
            <button className="btnregistro" onClick={handleClick}>Añadir Usuario</button>
        </form>
      </>
    )
}
export default Add;
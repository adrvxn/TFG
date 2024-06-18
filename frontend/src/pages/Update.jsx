import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";
const Update = () =>{
    const {id} = useParams();
    const [usuario,setUsuario] =useState({
        nombre: '',
        apellido: '',
        correo: '',
        dni: '',
        contraseña:''
    });
    const [error,setError] = useState(false);
    //con patch
    const [modifiedFields, setModifiedFields] = useState({});

    const navigate = useNavigate();
    const location= useLocation();
    
   useEffect( () => {
    const fetchUsuario = async () =>{
        try {
            const response = await axios.get(`http://localhost:8000/usuario/${id}`);
            const userData = response.data;
            if (Array.isArray(userData)) {
                setUsuario(userData[0]);
            } else {
                setUsuario(userData);
            }
            console.log(userData);
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }
    fetchUsuario();
}, [id]);

    const handleChanger = (e)=>{
        //añadido
        const { name, value } = e.target;
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value
        }));
        //Con patch
        setModifiedFields((prevModifiedFields) => ({
            ...prevModifiedFields,
            [name]: true
        }));
        //setUsuario(prev =>({...prev, [e.target.name]: e.target.value}));Anteriormente estaba asi
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const validateDNI = (dni) =>{
        const regex = /^(\d{8})([A-Z])$/;
        return regex.test(dni);
    }

    const handleValidation = () => {
        const newErrors = {};
        if (modifiedFields.correo && !validateEmail(usuario.correo)) {
            newErrors.correo = "Correo inválido";
        }
        if (modifiedFields.dni && !validateDNI(usuario.dni)) {
            newErrors.dni = "DNI inválido. Debe tener 8 números seguidos de una letra mayúscula";
        }
        if(modifiedFields.contraseña && usuario.contraseña.length < 6){
            newErrors.contraseña = "The password must have at least 6 characters";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClick = async (e)=>{
        e.preventDefault();
        if (!handleValidation()) {
            return;
        }
        //Con patch
        const updatedFields = Object.keys(modifiedFields).reduce((acc, field) => {
            if (modifiedFields[field]) {
                acc[field] = usuario[field];
            }
            return acc;
        }, {});
        console.log("Campo actualizado: ", updatedFields);
        
        try {
            // await axios.put(`http://localhost:8000/update/${id}`, usuario);
             await axios.patch(`http://localhost:8000/update/${id}`, updatedFields);
            navigate("/index");
        } catch (error) {
            console.log(error);
            setError(true);
        }
    }
     console.log(usuario[0]);
    return(
        <>
        <div className="container">
            <section className="heroconfiguration">
                <Nav/>
                <div className="titlecompanies">
                <h1>Configuration</h1>
            </div>
            </section>
            <section className="">
                <div className="titleSection">
                    <h1>Edit User</h1>
                </div>
                <div className="confiform">
                <div className="imgconfi"><i class="fa-solid fa-circle-user"></i></div>
                <div className="profile">
                    <form className="form">
                        {/* <h1>Update Usuario</h1> */}
                        <label for="reg-name">Name</label>
                        <input type="text" value={usuario.nombre} placeholder="nombre" name="nombre" maxLength={50} onChange={handleChanger}></input>
                        
                        <label for="reg-name">Surnames</label>
                        <input type="text" value={usuario.apellido}  placeholder="apellido" name="apellido" maxLength={100} onChange={handleChanger}></input>
                        
                        <label for="reg-email">Email</label>
                        <input type="email" value={usuario.correo} placeholder="correo" name="correo" maxLength={50} onChange={handleChanger} disabled></input>
                        {error.correo && <span className="error">{error.correo}</span>}

                        <label for="reg-dni">DNI</label>
                        <input type="text" value={usuario.dni} placeholder="dni" name="dni" maxLength={9} onChange={handleChanger} disabled></input>
                        {error.dni && <span className="error">{error.dni}</span>}

                        <label for="reg-password">Password</label>
                        <input type="password" value={usuario.contraseña} placeholder="contraseña" name="contraseña" maxLength={20} onChange={handleChanger}></input>
                        {error.contraseña && <span className="error">{error.contraseña}</span>}
                        <button className="btnregistro" onClick={handleClick}>Update User</button>
                    </form>
                </div>


                </div>
            </section>
            <Footer/>

        </div>
        
        </>
        
    )
}

export default Update;
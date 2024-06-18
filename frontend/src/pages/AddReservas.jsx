import axios from "axios";
import React ,{useEffect, useState,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import Nav from "../Nav";
import Footer from "../Footer";

const AddReservas = () =>{
const [reservas, setReservas] =useState({
    // id_usuario: "",
    id_usuario: localStorage.getItem("user_id") || "",
    // id_proveedor: "",
    id_proveedor: localStorage.getItem("selected_proveedor_id") || "",
    fecha_cita:""
});
const [usuarios, setUsuarios] = useState([]);
const [proveedores, setProveedores] = useState([]);
const [error,setError] = useState(false);
const [nextAvailableTime, setNextAvailableTime] = useState(null);
const navigate = useNavigate();
// useEffect(() => {
//     if (user) {
//       setReservas((prev) => ({ ...prev, id_usuario: user.id_usuario }));
//     }
//   }, [user]);
useEffect (()=>{
    //Usuario
    //MOD
    // axios.get("http://localhost:8000/usuario")
    // .then(response => setUsuarios(response.data))
    // .catch(error => console.error('Error fetching usuarios:', error));

    //Proveedor
    axios.get("http://localhost:8000/proveedor")
    .then(response => setProveedores(response.data))
    .catch(error => console.error('Error fetching proveedores:', error));

},[])
const validateForm = () =>{
    let formErrors = {};
    const currentDateTime = new Date();
    const selectedDateTime = new Date(reservas.fecha_cita);
    // MOD
   // if (!reservas.id_usuario) formErrors.id_usuario = "Debe seleccionar un usuario.";
    if (!reservas.id_proveedor) formErrors.id_proveedor = "You must choose a categorry.";
    if (!reservas.fecha_cita){
        formErrors.fecha_cita = "You must choose a date.";
    } else if(selectedDateTime < currentDateTime){
        formErrors.fecha_cita = "The selected date cannot be earlier than the current date.";
    }
    return formErrors;
}
const handleChanger = (e)=>{
    setReservas(prev =>({...prev, [e.target.name]: e.target.value}));
    setError((prev) => ({ ...prev, [e.target.name]: "" }));
    setNextAvailableTime(null);
}
const handleClick = async (e) =>{
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
        setError(formErrors);
        return;
    }
    try {
        await axios.post("http://localhost:8000/reservas", reservas);
        navigate("/reservas");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.nextAvailableTime) {
            // setNextAvailableTime(new Date(error.response.data.nextAvailableTime).toLocaleString());
            // setError((prev) => ({ ...prev, general: error.response.data.message }));
            const nextAvailableTime = new Date(error.response.data.nextAvailableTime);
            const nextAvailableHour = nextAvailableTime.getHours();
            const nextAvailableMinute = nextAvailableTime.getMinutes();
            const nextAvailableTimeString = `${nextAvailableHour}:${nextAvailableMinute < 10 ? '0' : ''}${nextAvailableMinute}`;
            
            setNextAvailableTime(nextAvailableTimeString);
            setError((prev) => ({ ...prev, general: error.response.data.message }));
        } else {
            setError((prev) => ({ ...prev, general: "Error al añadir la reserva" }));
        }
    }
}
    return(
        <>
        <div className="container">
        <section className="heroreserv">
            <Nav/>
            <div className="titledates">
                <h1>Add reserve</h1>
            </div>
        </section>
        <section className="containerReserv">
            <div className="reservform">
            <div className="imgconfi"><i class="fa-regular fa-calendar-check"></i></div>
            <div className="reservtext profile">
            <form>
                <label for="date">La fecha de la cita:</label>
                    <input type="datetime-local" id="datetime" name="fecha_cita" step="3600" value={reservas.fecha_cita} onChange={handleChanger} />
                        {error.fecha_cita && <p className="error">{error.fecha_cita}</p>}
                
            <button class="btnregistro" onClick={handleClick}>Add Reserve</button>
            {error.general && <p className="error">{error.general}</p>}
            </form>



            </div>
            </div>

        </section>
        <Footer/>
        </div>
           
        </>
    )
};

export default AddReservas;
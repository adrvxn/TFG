import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";

const UpdateReservas = () => {
    const { id } = useParams();
    const [reservas, setReservas] = useState({
        id_usuario: "",
        id_proveedor: "",
        fecha_cita: ""
    });
    const [usuarios, setUsuarios] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [error, setError] = useState(false);
    const [proximaCita, setproximaCita] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchReserva = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/reservas/${id}`);
                const reservaData = response.data;
                if (Array.isArray(reservaData)) {
                    setReservas(reservaData[0]);
                } else {
                    setReservas(reservaData);
                }
            } catch (error) {
                console.error('Error fetching reserva:', error);
                setError({ general: "Error al obtener los datos de la reserva" });
            }
        };

        fetchReserva();

        axios.get("http://localhost:8000/usuario")
            .then(response => setUsuarios(response.data))
            .catch(error => console.error('Error fetching usuarios:', error));

        axios.get("http://localhost:8000/proveedor")
            .then(response => setProveedores(response.data))
            .catch(error => console.error('Error fetching proveedores:', error));

    }, [id]);

    const handleChanger = (e) => {
        const { name, value } = e.target;
        setReservas(prev => ({
            ...prev,
            [name]: value
        }));
        setError((prev) => ({ ...prev, [name]: "" }));
    };

    const handleValidation = () => {
        const newErrors = {};
        const currentDateTime = new Date();
        const selectedDateTime = new Date(reservas.fecha_cita);
        if (!reservas.id_usuario) {
            newErrors.id_usuario = "Has seleccionado un usuario invalido";
        }
        if (!reservas.id_proveedor) {
            newErrors.id_proveedor = "Has seleccionado un proveedor invalido";
        }
        if (!reservas.fecha_cita) {
            newErrors.fecha_cita = "Has seleccionado una fecha invalida";
        } else if(selectedDateTime < currentDateTime) {
            newErrors.fecha_cita = "The selected date cannot be earlier than the current date..";
        }
        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatDateForInput = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const pad = (num) => num.toString().padStart(2, '0');
        const year = d.getFullYear();
        const month = pad(d.getMonth() + 1);
        console.log(month)
        const day = pad(d.getDate());
        const hours = pad(d.getHours());
        const minutes = pad(d.getMinutes());
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!handleValidation()) {
            return;
        }
        const updatedFields = Object.keys(reservas).reduce((acc, field) => {
            if (reservas[field]) {
                acc[field] = reservas[field];
            }
            return acc;
        }, {});

        try {
            await axios.patch(`http://localhost:8000/reservas/${id}`, updatedFields);
            navigate("/reservas");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.proximaCita) {
                const proximaCita = new Date(error.response.data.proximaCita);
                const nextAvailableHour = proximaCita.getHours();
                const nextAvailableMinute = proximaCita.getMinutes();
                const proximaCitaString = `${nextAvailableHour}:${nextAvailableMinute < 10 ? '0' : ''}${nextAvailableMinute}`;

                setproximaCita(proximaCitaString);
                setError((prev) => ({
                    ...prev,
                    general: `${error.response.data.message}. La próxima hora disponible es ${proximaCitaString}.`
                }));
            } else {
                setError({ general: "Error al actualizar la reserva" });
            }
        }
    };

    return (
        <>
        <div className="container">
        <section className="heroreserv">
            <Nav/>
            <div className="titledates">
                <h1>Update Reserve</h1>
            </div>
        </section>
        <section className="containerReserv">
            <div className="reservform">
                <div className="imgconfi"><i class="fa-regular fa-calendar-check"></i></div>
                <div className="reservtext profile">
                <form>
                {userId === "9" && (
                    // <div>
                    <>
                    <label htmlFor="id_usuario">Usuario:</label>
                        <select id="id_usuario" name="id_usuario" value={reservas.id_usuario} onChange={handleChanger}>
                            <option value="">Select an user</option>
                            {usuarios.map(usuario => (
                                <option key={usuario.id_usuario} value={usuario.id_usuario}>
                                    {usuario.nombre} {usuario.apellido}
                                </option>
                            ))}
                        </select>
                        {error.id_usuario && <p className="error">{error.id_usuario}</p>}
                    </>
                        
                    
                )}
                {/* <div>
                    <label htmlFor="id_proveedor">Proveedor:</label>
                    <select id="id_proveedor" name="id_proveedor" value={reservas.id_proveedor} onChange={handleChanger}>
                        <option value="">Seleccione un proveedor</option>
                        {proveedores.map(proveedor => (
                            <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                {proveedor.nombre_proveedor}
                            </option>
                        ))}
                    </select>
                    {error.id_proveedor && <p>{error.id_proveedor}</p>}
                </div> */}
                {userId === "9" && (
                    <>
                    
                        <label htmlFor="id_proveedor">Proveedor:</label>
                        <select id="id_proveedor" name="id_proveedor" value={reservas.id_proveedor} onChange={handleChanger}>
                            <option value="">Seleccione un proveedor</option>
                            {proveedores.map(proveedor => (
                                <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                    {proveedor.nombre_proveedor}
                                </option>
                            ))}
                        </select>
                        {error.id_proveedor && <p className="error">{error.id_proveedor}</p>}
                    
                    </>
                    
                )}

                
                    <label for="date">Date:</label><br></br>
                    <input type="datetime-local" id="fecha_cita" name="fecha_cita" value={formatDateForInput(reservas.fecha_cita)} onChange={handleChanger} />
                    {error.fecha_cita && <p className="error">{error.fecha_cita}</p>}
                
                <button class="btnregistro" onClick={handleClick}>Update Reserve</button>
                {error.general && <p className="error">{error.general}</p>}
                {proximaCita && <p>Próxima hora disponible: {proximaCita}</p>}
            </form>
                </div>
            </div>
        </section>
            <Footer/>
        </div>
        </>
    );
}

export default UpdateReservas;

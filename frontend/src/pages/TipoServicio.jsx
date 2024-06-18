import React, { useState, useEffect }from "react"
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";

const TipoServicio = () => {
const [proveedores, setProveedores] = useState([]);
const { tipo_servicio } = useParams();
const userId = localStorage.getItem("user_id");

useEffect(() =>{
    const fetchAllProveedor = async () =>{
        try {
            const res = await axios.get(`http://localhost:8000/proveedor/${tipo_servicio}`);
            setProveedores(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }
     fetchAllProveedor();
}, [tipo_servicio]);

//DELETE
const handleDelete = async (id_proveedor) => {
    const confirmUser = window.confirm("Estas seguro de borrar este proveedor?");
    if(confirmUser) {
        await axios.delete(`http://localhost:8000/proveedor/${id_proveedor}`).then((respuesta) =>{
        console.log("Proveedor eliminado correctamente:", respuesta.data)
        setProveedores(proveedores.filter(proveedor => proveedor.id_proveedor !== id_proveedor));
        }).catch( (error) =>{
            console.log( `Error: ${error}`);
        })
    } else {
        console.log("Operación cancelada correctamente.")
    }
};
const handleChooseReservation = (id_proveedor) => {
    localStorage.setItem("selected_proveedor_id", id_proveedor);
};
return (
    <>
    <div className="container">
        <section className="herocompanies">
            <Nav/>
            <div class="titlecompanies">
                {/* <h1>Sanidad</h1> */}
                <h1>{tipo_servicio}</h1>
            </div>
        </section>
        <section className="myCategories">

        <div className="containerMyCategories">
            {proveedores.map(proveedor=>(
        <div className="category1" key={proveedor.id_proveedor}>
            <div className="filacategoria">
            <div class="imgcategory"><i class="fa-solid fa-briefcase"></i></div>
                <div className="textcategory">
                    <h3>{proveedor.profesional}</h3>
            {/* <p>{proveedor.direccion}</p>
            <p>{proveedor.telefono}</p> */}
                </div>
            </div>
            <div class="btncategory">
                        {/* <a class="access" href="reserv.html">Choose reservation</a> */}
                        <Link onClick={() => handleChooseReservation(proveedor.id_proveedor)} className="access" to="/reservas/add">Choose reservation</Link>
                        {userId === "9" && (
              <>
              
                <button className="btnregistro "><Link to={`/proveedor/update/${proveedor.id_proveedor}`}>Actualizar Proveedor</Link></button>
            <a className="delete" onClick={() => handleDelete(proveedor.id_proveedor)}>Borrar</a>
              
              
                
              </>
            )}
            
            </div>
            
        </div>
    ))}
    </div>
    {/* <button> <Link to="/proveedor">Volver a proveedores</Link></button> */}

        </section>
        
    
    <Footer/>
    </div>
    </>
)

}

export default TipoServicio;
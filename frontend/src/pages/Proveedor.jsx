import React,{ useState , useEffect}  from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Nav from "../Nav";
import Footer from "../Footer";
const Proveedor = () => {
const [proveedores, setProveedores] = useState([]);
const [usuario,setUsuario] =useState([]);
const userId = localStorage.getItem("user_id");
const [userDetails, setUserDetails] = useState(null);

useEffect(()=>{
    const fetchAllProveedor = async () =>{
        try {
            const res = await axios.get("http://localhost:8000/proveedores");
            setProveedores(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err);
        }
    }
     fetchAllProveedor();
},[]);

//Para que funcione
useEffect(() => {
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/usuarios/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Error fetching user details');
        }
    };

    if (userId) {
        fetchUserDetails();
    }
}, [userId]);
//
//DELETE
const handleDelete = async (id_proveedor) => {
    const confirmUser = window.confirm("Estas seguro de borrar este proveedor?");
    if(confirmUser) {
        const respuesta = await axios.delete(`http://localhost:8000/proveedor/${id_proveedor}`).then((respuesta) =>{
        console.log("Proveedor eliminado correctamente:", respuesta.data)
        setProveedores(proveedores.filter(proveedor => proveedor.id_proveedor !== id_proveedor));
        }).catch( (error) =>{
            console.log( `Error: ${error}`);
        })
    } else {
        console.log("Operación cancelada correctamente.")
    }
};
return(
    <>
    <div className="container">
    <section className="herolanding">
            <Nav />
            <div class="titlelanding">
                <h1>Booking an appointment has never been so simple!</h1>
            </div>
        </section>
        <section class="myCategories">
            <div class="titleSection">
                <h1>My Categories</h1>
            </div>
        </section>
        <div className="containerMyCategories">
            {proveedores.map(proveedor=>(
                <div className="category1" key={proveedor.id_proveedor}>
                    <div className="filacategoria">
                    <div class="imgcategory"><i class="fa-solid fa-briefcase"></i></div>
                        <div className="textcategory">
                            <h2>{proveedor.tipo_servicio}</h2>
                        </div>
                    </div>
                    <div className="btncategory">
                        <Link  className="access" to={`/index/${proveedor.tipo_servicio}`}> Access</Link>
                    </div>
                    
                    
                    {userId === "9" && (
                    <> 
                    {/* <button className="delete" onClick={() => handleDelete(proveedor.id_proveedor)}>Borrar</button>
                    <button className="update"><Link to={`/proveedor/${proveedor.id_proveedor}`}>Actualizar Proveedor</Link></button> */}
                     </> 
              )} 
                </div>
            ))}
        </div>
        {/* <button><Link to={"/proveedor/add"}>Añadir proveedor</Link></button>
        <button><Link to={"/usuario"}>Volver a "/"</Link></button> */}
        {/* <button><Link to="/logout">Cerrar Sesion</Link></button> */}
        {/* <button>
          <Link to="/usuario">Volver a Usuario</Link>
        </button> */}
        <Footer/>



    </div>
    
        
    </>
)
}
export default Proveedor;

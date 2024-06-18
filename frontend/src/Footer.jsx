import React from "react";
import { Link } from "react-router-dom";
const Footer = () =>{
    const userId = localStorage.getItem("user_id");
    return(
        <>
            <footer class="footer">
            <div class="logo">
                <div class="imglogo"><h1>BA</h1></div>
                <div class="textologo">
                    <h1>Book Appointments</h1>
                </div>
            </div>
            <div class="contenidofooter">
                <div class="menus">
                    <div class="fila">
                        <ul class="list-nav-footer">
                            {/* Cambiar a sus respectivas rutas */}
                            <li><Link to="/index">Home</Link></li>
                            {userId === "9" && (
                            <li><a href="categories.html">New Categories</a></li>
                        )}
                            <li><Link to="/reservas">My dates</Link></li>
                        </ul>
                    </div>
                    <div class="fila">
                        <ul class="list-nav-footer">
                            <li><a href="">General conditions</a></li>
                            <li><a href="">Privacy policy</a></li>
                            <li><a href="">Cookies policy</a></li>
                        </ul>
                    </div>
                    <div class="fila">
                        <ul class="list-nav-footer">
                            <li><a href="">Telephone: 958784537</a></li>
                            <li><a href="">Whatsapp: 666553478</a></li>
                            <li><a href="">Linkedin</a></li>
                        </ul>
                    </div>
                    <div class="fila">
                        <ul class="list-nav-footer">
                            <li><a href="">Facebook</a></li>
                            <li><a href="">Twitter</a></li>
                            <li><a href="">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div class="copy">
                    &copy;Copyright 2024 Book Appointments
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer;
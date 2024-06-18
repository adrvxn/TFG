import axios from "axios";
import React, { useState, useContext , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import NavLogin from "../NavLogin";
import Add from "./Add";

function Login({ onLogin }) {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
/* */
useEffect(() => {
  const container = document.querySelector(".containersesion");
  const btnSignIn = document.getElementById("btn-sign-in");
  const btnSignUp = document.getElementById("btn-sign-up");
  const btnSignIn2 = document.getElementById("btn-sign-in2");
  const btnSignUp2 = document.getElementById("btn-sign-up2");
  const cont = document.querySelector(".container-welcome");

  btnSignIn.addEventListener("click", () => {
    container.classList.remove("toggle");
  });
  btnSignUp.addEventListener("click", () => {
    container.classList.add("toggle");
  });
  btnSignIn2.addEventListener("click", () => {
    container.classList.remove("toggle");
  });
  btnSignUp2.addEventListener("click", () => {
    container.classList.add("toggle");
  });
  return () => {
    btnSignIn.removeEventListener("click", () => {
      container.classList.remove("toggle");
    });
    btnSignUp.removeEventListener("click", () => {
      container.classList.add("toggle");
    });
    btnSignIn2.removeEventListener("click", () => {
      container.classList.remove("toggle");
    });
    btnSignUp2.removeEventListener("click", () => {
      container.classList.add("toggle");
    });
  };
}, []);
  /* */
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        correo,
        contraseña,
      });
      if (response.data.success) {
        localStorage.setItem("user_id", response.data.user.id_usuario);
        onLogin();
        navigate("/index");
        console.log("Login hecho correctamente!!");
      } else {
        alert(response.data.message);
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      alert("An error occurred while logging in");
    }
  };
  return (
    <>
      <div className="container">
        <section className="sessionlanding">
          <NavLogin />
          <div className="containersesion">
            <div class="containerForm">
              <div class="loginsection" id="loginsection">
                <i class="fa-solid fa-circle-user"></i>
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                  {/* <h1>Aqui va el login</h1> */}
                  <label for="email">Email</label>
                  <input
                    type="email"
                    placeholder="correo"
                    name="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  ></input>
                  <label for="password">Password</label>
                  <input
                    type="password"
                    placeholder="contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                  ></input>
                  <button className="btnsession" type="submit">
                    Login
                  </button>
                </form>
                <a href="#" id="btn-sign-up2">
                  You do not have an account? Sign up
                </a>
              </div>

              <div class="register-form-section" id="register-form-section">
                        {/* <h2>Sign up</h2> */}
                        <Add/>
                        
                        <a href="#" id="btn-sign-in2">Do you already have an account? Log in</a>
                    </div>



                    <div class="container-welcome">
                        <div class="welcome-sign-up welcome">
                            <h3>Welcome!</h3>
                            <p>If you don't have an account yet, join us and book now.</p>
                            <button class="btnregister" id="btn-sign-up">Sign up</button>
                        </div>
                        <div class="welcome-sign-in welcome">
                            <h3>Join us!</h3>
                            <p>Register to access the features or log in if you have an account</p>
                            <button class="btnregister" id="btn-sign-in">Sign in</button>
                        </div>
                    </div>
            </div>
          </div>
        </section>
      </div>
      <script>
        
      </script>
    </>
  );
}
export default Login;

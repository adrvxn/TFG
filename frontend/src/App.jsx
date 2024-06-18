import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useState } from "react";
import "./index.css";
import Add from './pages/Add.jsx';
import AddProveedor from "./pages/AddProveedor.jsx";
import AddReservas from "./pages/AddReservas.jsx";
import Login from "./pages/Login.jsx";
import Proveedor from "./pages/Proveedor.jsx";
import Reservas from "./pages/Reservas.jsx";
import Update from './pages/Update.jsx';
import UpdateProveedor from "./pages/UpdateProveedor.jsx";
import UpdateReservas from "./pages/UpdateReservas.jsx";
import Usuario from './pages/Usuario.jsx';
import ProtectedRoute from "./ProtectedRoutes.jsx";
import TipoServicio from "./pages/TipoServicio.jsx";
import Logout from "./LogOut.jsx";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        <Route
          path='/usuario'
          element={<ProtectedRoute element={Usuario} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/add'
          element={<ProtectedRoute element={Add} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/usuario/:id'
          element={<ProtectedRoute element={Update} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/index'
          element={<ProtectedRoute element={Proveedor} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/index/:tipo_servicio'
          element={<ProtectedRoute element={TipoServicio} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/proveedor/add'
          element={<ProtectedRoute element={AddProveedor} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/proveedor/update/:id'
          element={<ProtectedRoute element={UpdateProveedor} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/reservas'
          element={<ProtectedRoute element={Reservas} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/reservas/add'
          element={<ProtectedRoute element={AddReservas} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path='/reservas/:id'
          element={<ProtectedRoute element={UpdateReservas} isAuthenticated={isAuthenticated} />}
        />
        {/* <Route path="/logout" Component={Logout}></Route> */}
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App

//#region CONF Básica
import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
//Arrancar con npm start 
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors())

const sql = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.listen(8000, ()=>{
    console.log("Backend conectado correctamente en puerto 8000.")
})
app.get("/", (req,res)=>{
    res.json("Hola desde el main.");
})
//#endregion
//#region  USUARIO
//------------------------------------USUARIO
//Para mostar todos los usuarios (Lo hace bien)
app.get("/usuario", (req,res)=>{
    const q = "SELECT * FROM usuario";
    sql.query(q,(err, data) =>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/usuario", (req, res)=>{
    const q = "INSERT INTO usuario (`nombre`,`apellido`,`correo`,`dni`,`contraseña`) VALUES (?)";
    const values = [req.body.nombre, req.body.apellido,req.body.correo, req.body.dni, req.body.contraseña];
    sql.query(q, [values], (err, data)=>{
        if (err) return res.send(err);
        return res.json(data);
    });
});

//DELETE FUNCIONA CORECTAMENTE 
app.delete("/usuario/:id_usuario", (req, res) =>{
    const usuarioId = req.params.id_usuario;
    const q = "DELETE FROM usuario WHERE id_usuario = ? ";

    sql.query(q, [usuarioId], (err, data) =>{
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.get("/usuario/:id", (req, res) =>{
    const q = "SELECT * FROM usuario WHERE id_usuario = ?"
    const value = req.params.id
    sql.query(q, [value], (err, data) =>{
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.get("/usuarios/:id", (req, res) =>{
    const q = "SELECT * FROM usuario WHERE id_usuario = ?";
    const value = req.params.id;
    sql.query(q, [value], (err, data) => {
        if (err) return res.send(err);
        if (data.length > 0) {
            return res.json(data[0]); 
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    });
});
//UPDATE CON PATCH FUNCIONA CORRECTAMENTE
  app.patch("/update/:id", (req, res) => {
    const usuarioId = req.params.id;
    let q = "UPDATE usuario SET ";
    const fields = [];
    const values = [];

    if (req.body.nombre !== undefined) {
        fields.push("`nombre` = ?");
        values.push(req.body.nombre);
    }
    if (req.body.apellido !== undefined) {
        fields.push("`apellido` = ?");
        values.push(req.body.apellido);
    }
    if (req.body.correo !== undefined) {
        fields.push("`correo` = ?");
        values.push(req.body.correo);
    }
    if (req.body.dni !== undefined) {
        fields.push("`dni` = ?");
        values.push(req.body.dni);
    }
    if (req.body.contraseña !== undefined) {
        fields.push("`contraseña` = ?");
        values.push(req.body.contraseña);
    }
    if (fields.length === 0) {
        return res.status(400).send("No hay campos para actualizar");
    }
    q += fields.join(", ") + " WHERE id_usuario = ?";
    values.push(usuarioId);
    sql.query(q, values, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

  /** */
  app.post("/login", (req, res) => {
    const { correo, contraseña } = req.body;
    const q = "SELECT * FROM usuario WHERE correo = ? AND contraseña = ?";
    sql.query(q, [correo, contraseña], (err, results) => {
        if (err) {
            console.error("Error en la consulta:", err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }
    if (results.length > 0) {
        const user = results[0]; 
        res.status(200).json({ success: true, user }); 
        console.log("Usuario logueado correctamente.");
    } else {
        res.status(401).json({ success: false, message: 'Correo electrónico o contraseña inválidos' });
    }
    });

});
  /* */

//#region PROVEEDOR
//------------------------------------PROVEEDOR-------------------------------------------------------------------------------------
app.get("/proveedor", (req, res)=>{
    const q = "SELECT * FROM proveedor";
    sql.query(q,(err, data) =>{
        if (err) return res.json(err);
        return res.json(data);
    })
})
app.get("/proveedores", (req, res)=>{
    const q = "SELECT tipo_servicio, GROUP_CONCAT(nombre_proveedor) AS nombres_proveedores FROM proveedor GROUP BY tipo_servicio;";
    sql.query(q,(err, data) =>{
        if (err) return res.json(err);
        return res.json(data);
    })
})
//MOstar cada tipo_servicio
app.get("/proveedor/:tipo_servicio", (req, res)=>{
    const q = "SELECT * FROM proveedor WHERE tipo_servicio = ?";
    const value = req.params.tipo_servicio;
    sql.query(q,[value],(err, data) =>{
        if (err) return res.json(err);
        return res.json(data);
    })
})
//FUNCIONA CORRECTAMENTE
app.post("/proveedor", (req,res)=>{
    const q = "INSERT INTO proveedor (`nombre_proveedor`,`tipo_servicio`,`profesional`,`direccion`,`telefono`) VALUES (?)";
    const values = [req.body.nombre_proveedor, req.body.tipo_servicio, req.body.profesional, req.body.direccion, req.body.telefono];
    sql.query(q,[values],(err, data)=>{
        if (err) return res.send(err);
        return res.json(data);
    });
});
app.get("/proveedor/update/:id", (req, res) =>{
    const q = "SELECT * FROM proveedor WHERE id_proveedor = ?"
    const value = req.params.id
    // console.log(value);
    sql.query(q, [value], (err, data) =>{
        if (err) return res.send(err);
        return res.json(data);
    });
});

// PATCH para editar proveedor (FUNCIONA CORRECTAMENTE)
app.patch("/proveedor/:id", (req, res) => {
    const proveedorId = req.params.id;
    let q = "UPDATE proveedor SET ";
    const fields = [];
    const values = [];

    if (req.body.nombre_proveedor !== undefined) {
        fields.push("`nombre_proveedor` = ?");
        values.push(req.body.nombre_proveedor);
        console.log(req.body.nombre_proveedor);
    }
    if (req.body.tipo_servicio !== undefined) {
        fields.push("`tipo_servicio` = ?");
        values.push(req.body.tipo_servicio);
    }
    if (req.body.profesional !== undefined) {
        fields.push("`profesional` = ?");
        values.push(req.body.profesional);
    }
    if (req.body.direccion !== undefined) {
        fields.push("`direccion` = ?");
        values.push(req.body.direccion);
    }
    if (req.body.telefono !== undefined) {
        fields.push("`telefono` = ?");
        values.push(req.body.telefono);
    }

    if (fields.length === 0) {
        return res.status(400).send("No hay campos para actualizar");
    }

    q += fields.join(", ") + " WHERE id_proveedor = ?";
    values.push(proveedorId);
    sql.query(q, values, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});
// DELETE FUNCIONA CORRECTAMENTE
app.delete("/proveedor/:id", (req, res) =>{
    const proveedorId = req.params.id;
    const q = "DELETE FROM proveedor WHERE id_proveedor = ? ";

    sql.query(q, [proveedorId], (err, data) =>{
        if (err) return res.send("Error: "+err);
        return res.json(data);
    });
});
//#endregion
//#region  RESERVA
//------------------------------------RESERVA
app.get("/reservas", (req, res) => {
    const userId = req.query.userId;
    let q;

    if (userId) {
        q = "SELECT id_reserva, reservas.id_usuario, nombre, apellido, reservas.id_proveedor, nombre_proveedor, proveedor.profesional, fecha_cita FROM reservas INNER JOIN usuario ON usuario.id_usuario = reservas.id_usuario INNER JOIN proveedor ON proveedor.id_proveedor = reservas.id_proveedor WHERE reservas.id_usuario = ? AND fecha_cita >= NOW() ORDER BY fecha_cita";
    } else {
        q = "SELECT id_reserva, reservas.id_usuario, nombre, apellido, reservas.id_proveedor, nombre_proveedor,proveedor.profesional, fecha_cita FROM reservas INNER JOIN usuario ON usuario.id_usuario = reservas.id_usuario INNER JOIN proveedor ON proveedor.id_proveedor = reservas.id_proveedor WHERE fecha_cita >= NOW() ORDER BY fecha_cita";
    }

    sql.query(q, userId ? [userId] : [], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//ADD RESERVA (FUNCIONA CORRECTAMENTE);
app.post("/reservas", (req, res)=>{
    const { id_usuario, id_proveedor, fecha_cita } = req.body;

    const checkQuery = `
        SELECT * FROM reservas 
        WHERE id_proveedor = ? 
        AND ABS(TIMESTAMPDIFF(MINUTE, fecha_cita, ?)) < 60;
    `;

    sql.query(checkQuery, [id_proveedor, fecha_cita], (err, results) => {
        if (err) return res.send(err);

        if (results.length > 0) {
            const lastCita = results.reduce((latest, cita) => {
                const citaDate = new Date(cita.fecha_cita);
                return citaDate > latest ? citaDate : latest;
            }, new Date(0));
            const nextAvailableTime = new Date(lastCita.getTime() + 60 * 60 * 1000);
            const nextAvailableHour = nextAvailableTime.getHours();
            const nextAvailableMinute = nextAvailableTime.getMinutes();
            const nextAvailableTimeString = `${nextAvailableHour}:${nextAvailableMinute < 10 ? '0' : ''}${nextAvailableMinute}`;

            return res.status(400).json({
                message: `There cannot be two appointments at the same time or within one hour for the same provider. The next available time is at ${nextAvailableTimeString}h.`,
                nextAvailableTime: nextAvailableTime.toISOString()
            });
        }

        const insertQuery = `
            INSERT INTO reservas (id_usuario, id_proveedor, fecha_cita) 
            VALUES (?, ?, ?);
        `;
        sql.query(insertQuery, [id_usuario, id_proveedor, fecha_cita], (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
        });
    });
});



//DELETE RESERVA (FUNCIONA CORRECTAMENTE)
app.delete("/reservas/:id", (req, res) =>{
    const reservaId = req.params.id;
    const q = "DELETE FROM reservas WHERE id_reserva = ?";

    sql.query(q, [reservaId], (err, data) =>{
        if (err) return res.send("Error: "+err);
        return res.json(data);
    });
});

app.get("/reservas/:id", (req, res) =>{
    const q = "SELECT * FROM reservas WHERE id_reserva = ? AND fecha_cita >= NOW() ORDER BY fecha_cita ASC"
    const value = req.params.id
    sql.query(q, [value], (err, data) =>{
        if (err) return res.send(err);
        return res.json(data);
    });
});

//UPDATE RESERVA (FUNCIONA CORRECTAMENTE)
app.patch("/reservas/:id", (req,res) =>{
    const reservasId = req.params.id;
    const { id_usuario, id_proveedor, fecha_cita } = req.body;

    let checkQuery = `
        SELECT * FROM reservas 
        WHERE id_proveedor = ? 
        AND id_reserva != ? 
        AND ABS(TIMESTAMPDIFF(MINUTE, fecha_cita, ?)) < 60;
    `;

    sql.query(checkQuery, [id_proveedor, reservasId, fecha_cita], (err, results) => {
        if (err) return res.send(err);

        if (results.length > 0) {
            const lastCita = results.reduce((latest, cita) => {
                const citaDate = new Date(cita.fecha_cita);
                return citaDate > latest ? citaDate : latest;
            }, new Date(0));
            const nextAvailableTime = new Date(lastCita.getTime() + 60 * 60 * 1000);
            const nextAvailableHour = nextAvailableTime.getHours();
            const nextAvailableMinute = nextAvailableTime.getMinutes();
            const nextAvailableTimeString = `${nextAvailableHour}:${nextAvailableMinute < 10 ? '0' : ''}${nextAvailableMinute}`;

            return res.status(400).json({
                message: `No puede haber dos citas a la misma hora o dentro de una hora para el mismo proveedor. La próxima hora disponible es a las ${nextAvailableTimeString}h.`,
                nextAvailableTime: nextAvailableTime.toISOString()
            });
        }
        let q = "UPDATE reservas SET";
        const fields = [];
        const values = [];
        if (id_usuario !== undefined) {
            fields.push("`id_usuario` = ?");
            values.push(id_usuario);
        }
        if (id_proveedor !== undefined) {
            fields.push("`id_proveedor` = ?");
            values.push(id_proveedor);
        }
        if (fecha_cita !== undefined) {
            fields.push("`fecha_cita` = ?");
            values.push(fecha_cita);
        }
        if (fields.length === 0) {
            return res.status(400).send("No hay campos para actualizar");
        }
        q += fields.join(", ") + " WHERE id_reserva = ?";
        values.push(reservasId);

        sql.query(q, values, (err, data) => {
            if (err) return res.send(err);
            return res.json(data);
        });
    });
});
//#endregion
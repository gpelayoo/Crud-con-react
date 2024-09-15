const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "barberia"
});

// Endpoint para crear un servicio
app.post("/create", (req, res) => {
    const { nombre_servicio, descripcion, precio } = req.body;
    db.query('INSERT INTO servicio (nombre_servicio, descripcion, precio) VALUES (?, ?, ?)', 
    [nombre_servicio, descripcion, precio], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Servicio creado con éxito");
        }
    });
});

// Endpoint para mostrar servicios
app.get("/servicios", (req, res) => {
    db.query('SELECT * FROM servicio', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// Endpoint para actualizar un servicio
app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nombre_servicio, descripcion, precio } = req.body;
    db.query('UPDATE servicio SET nombre_servicio = ?, descripcion = ?, precio = ? WHERE id = ?', 
    [nombre_servicio, descripcion, precio, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Servicio actualizado con éxito");
        }
    });
});

// Endpoint para eliminar servicio
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM servicio WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Servicio eliminado con éxito");
        }
    });
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});

const dbConnection = require('../database/connection');
const sql = require('mssql');

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {

    const connection = await dbConnection();

    const result = await connection.request().query('SELECT * FROM clientes WHERE status = 1');

    res.json(result.recordset);
});

router.post('/', async (req,res) => {

    const client = req.body;

    const connection = await dbConnection();

    connection.request()
    .input("nombre", sql.VarChar, client.nombre)
    .input("apellido_paterno", sql.VarChar, client.apellido_paterno)
    .input("apellido_materno", sql.VarChar, client.apellido_materno)
    .input("rfc", sql.VarChar, client.rfc)
    .input("telefono", sql.VarChar, client.telefono)
    .input("email", sql.VarChar, client.email)
    .input("codigo_postal", sql.VarChar, client.codigo_postal)
    .input("direccion", sql.VarChar, client.direccion)
    .input("status", sql.Int, 1)
    .query(
        "INSERT INTO clientes (nombre,apellido_paterno,apellido_materno,rfc,telefono,email,codigo_postal,direccion,status) VALUES (@nombre,@apellido_paterno,@apellido_materno,@rfc,@telefono,@email,@codigo_postal,@direccion,@status)"
        );

    res.json(client);
});

router.delete('/:id', async (req, res) => {
    
    const id = req.params.id;

    const connection = await dbConnection();

    connection.request()
    .input("id", sql.Int, id)
    .query("UPDATE clientes SET status = 0 WHERE id = @id");

    res.json("Client deleted sucessfully");
});

router.put('/:id', async (req,res) => {

    const id = req.params.id;

    const client = req.body;

    const connection = await dbConnection();

    connection.request()
    .input("id", sql.Int, id)
    .input("nombre", sql.VarChar, client.nombre)
    .input("apellido_paterno", sql.VarChar, client.apellido_paterno)
    .input("apellido_materno", sql.VarChar, client.apellido_materno)
    .input("rfc", sql.VarChar, client.rfc)
    .input("telefono", sql.VarChar, client.telefono)
    .input("email", sql.VarChar, client.email)
    .input("codigo_postal", sql.VarChar, client.codigo_postal)
    .input("direccion", sql.VarChar, client.direccion)
    .query(
        "UPDATE clientes SET nombre = @nombre,apellido_paterno = @apellido_paterno,apellido_materno = @apellido_materno,rfc = @rfc,telefono = @telefono,email = @email,codigo_postal = @codigo_postal,direccion = @direccion WHERE id = @id"
        );

    res.json(client);
});

module.exports = router;
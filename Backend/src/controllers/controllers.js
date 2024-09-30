const pool = require('../config/db');
const format = require('pg-format');
require('dotenv').config();
const JWT = require("jsonwebtoken");
const { SECRET } = process.env;

const register = async (req, res) => {
    try {
        const data = req.body
        let pushQuery = format(`INSERT INTO usuarios (email, password, rol, lenguage) VALUES ('%s', '%s', '%s', '%s')`, data.email, data.password, data.rol, data.lenguage );
        await pool.query(pushQuery);
        const getQuery = await pool.query('SELECT * FROM usuarios ORDER BY ID DESC LIMIT 10');
        console.log(`usuario ${data.email} agregado a base datos`);
        res.send(getQuery.rows);
    } catch (error) {
        console.log(error);
    }
}

const login = (req, res) => {
    try {
        const email = req.body.email
        console.log("el email es:", email)
        const token = JWT.sign({email}, SECRET)
        console.log("el token es:",token)
        res.send(token)
    } catch (error) {
        console.log(error)
    }
}

const getUsuarios = (req, res) => {
    try {
        console.log("el req.body es:", req.body, "y el req.token", req.token)
        
        res.send("asdasd")
    } catch (error) {
        console.log(error)
    }

}

module.exports = { register, login, getUsuarios }
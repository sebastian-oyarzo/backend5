const pool = require('../config/db');
const format = require('pg-format');
require('dotenv').config();
const JWT = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { SECRET } = process.env;


const register = async (req, res) => {
    try {
        const data = req.body
        const passwordEncripted = bcrypt.hashSync(req.body.password)
        let pushQuery = format(`INSERT INTO usuarios (email, password, rol, lenguage) VALUES ('%s', '%s', '%s', '%s')`, data.email, passwordEncripted, data.rol, data.lenguage );
        await pool.query(pushQuery);
        const getQuery = await pool.query('SELECT * FROM usuarios ORDER BY ID DESC LIMIT 10');
        console.log(`usuario ${data.email} agregado a base datos`);
        res.send(getQuery.rows);
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const email = req.body.email
        const token = JWT.sign({email}, SECRET)
        res.send({token: `${token}`})
    } catch (error) {
        console.log(error)
    }
}

const getUsuarios = async (req, res) => {
    try {
        const autentication = req.headers.authorization;
        console.log("autentication:", autentication)
        if (!autentication) {
            return res.status(401).send("Authorization header missing");
        }
        const keys = autentication.split(" ");
        if (keys[1] != undefined) {
            const verification = JWT.verify(keys[1], SECRET);

            const email = verification.email;  // Extraer email desde el token

            const decoded = JWT.decode(keys[1]);
            console.log("email decodificado:", decoded);

            // Ejecutar consulta para obtener todos los usuarios
            const getQuery = await pool.query('SELECT * FROM usuarios');

            // Buscar al usuario con el email del token
            const findUser = getQuery.rows.find(row => row.email == email);

            if (!findUser) {
                return res.status(404).send("Usuario no encontrado");
            }

            // Responder con los datos del usuario encontrado
            res.json([findUser]);
        } else {
            res.status(400).send("Token de autenticación faltante");
        }
    } catch (error) {
        console.log("Error al verificar token o ejecutar la consulta:", error);
        res.status(403).send("Token inválido o malformado");
    }
}


module.exports = { register, login, getUsuarios }
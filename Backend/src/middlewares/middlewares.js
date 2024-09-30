const pool = require('../config/db');
const { SECRET } = process.env;
const bcrypt = require('bcryptjs');

const validator = async (req, res, next) => {
    try {
        const getQuery = await pool.query('SELECT * FROM usuarios')
        if(!getQuery.rows.length){
            console.log("tabla vacia, se procede a ingresar el primer dato")
            return getQuery, next()
        } else {
            const searchEmail = getQuery.rows.find(row => row.email === req.body.email);
            const searchId = getQuery.rows.find(row => row.id == req.body.id );
            if((searchEmail != undefined) || (searchId != undefined)) {
                console.log("el usuario ya se encuentra registrado");
                return res.status(401).send("el usuario ya se encuentra registrado");
            }
        }
        return next()
    } catch (error) {
        console.log(error)
        throw error
    }
}

const validatorLogin = async(req, res, next) => {
        try {
            const getQuery = await pool.query('SELECT * FROM usuarios')
            const email = req.body.email
            const password = req.body.password;
            const findUser = getQuery.rows.find(row => row.email == email)
            if(!findUser || !bcrypt.compareSync(password, findUser.password)) {
                return res.status(401).send("Usuario o contraseña incorrectos");
            } else {
                next()
            }
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
}

module.exports = {validator, validatorLogin}


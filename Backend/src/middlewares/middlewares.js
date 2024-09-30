const pool = require('../config/db')

const validator = async (req, res, next) => {
    try {
        const getQuery = await pool.query('SELECT * FROM usuarios')
        if(!getQuery.rows){
            console.log("tabla vacia, se procede a ingresar el primer dato")
            return getQuery, next()
        } else {
            const searchEmail = getQuery.rows.find(row => row.email === req.body.email);
            const searchId = getQuery.rows.find(row => row.id == req.body.id )
            if((searchEmail != undefined) || (searchId != undefined)) {
                return res.send("el usuario ya se encuentra registrado")
            }
        }
        return next()
    } catch (error) {
        console.log(error)
        throw error
    }
}

const validatorLogin = async(req, res, next) => {
        const getQuery = await pool.query('SELECT * FROM usuarios')
        const email = req.body.email
        const password = req.body.password
        const findUser = getQuery.rows.find(row => (row.email == email) && (row.password == password) )
        if(findUser == undefined) {
            return res.send("usuario o contraseña incorrectos")
        } else {
            next()
        }
}

module.exports = {validator, validatorLogin}


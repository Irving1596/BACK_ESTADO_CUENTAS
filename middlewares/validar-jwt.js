const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    //leer token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            OK: false,
            MSG: 'no hay token en la peticion'
        })
    }
    try {
        const { ID } = jwt.verify(token, process.env.JWT_SECRET);
        console.log(ID);
    } catch (error) {
        return res.status(401).json({
            OK: false,
            MSG: 'Token no valido'
        })
    }
    next();
}
module.exports = {
    validarJWT
}
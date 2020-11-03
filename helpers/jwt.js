const jwt = require('jsonwebtoken');



const generarJWT = (ID, USUARIO, NUM_CUENTA) => {

    return new Promise((resolve, reject) => {
        const payload = {
            ID,
            USUARIO,
            NUM_CUENTA
        };
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se logro generar el JWT');
            } else {
                resolve(token);
            }
        });
    });

}
const obtenerDataUsuario = (req) => {

    //leer token
    const token = req.header('x-token');
    try {
        const { USUARIO, NUM_CUENTA } = jwt.verify(token, process.env.JWT_SECRET);
        return { USUARIO, NUM_CUENTA };
    } catch (error) {
        return res.status(401).json({
            OK: false,
            MSG: 'No se logro obtener el ROL'
        })
    }

}
module.exports = {
    generarJWT,
    obtenerDataUsuario
}
const db = require("../models/init-models.js");
const models = db.initModels(db.sequelize);
const CLIENTES = models.CLIENTES;
const USUARIOS = models.USUARIOS;
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { generarJWT, obtenerDataUsuario } = require('../helpers/jwt');
const { crearEnviarHash } = require('../helpers/recovery');
const Op = db.Sequelize.Op;

const controller = {};

const key = "verysecretkey";

/**
 * Se verifica si el numero de cuenta existe en el sistema
 */
controller.authRegistro = async function post(req, res, next) {
    try {
        let login = getAuthRegistroBody(req);
        const CLIENTE = await CLIENTES.findOne({ where: { NUM_CUENTA: login.NUM_CUENTA } })
        if (!CLIENTE) {
            return res.status(201).json({
                OK: false,
                MSG: 'cliente no encontrado'
            })
        }
        const USUARIO = await USUARIOS.findOne({ where: { ID_CLIENTE: login.NUM_CUENTA } })
        if (USUARIO) {
            return res.status(201).json({
                OK: false,
                MSG: 'usuario ya esta registrado'
            })
        }
        //Validado
        return res.status(201).json({
            OK: true,
            MSG: 'Si existe cliente',
            NOMBRE: CLIENTE.dataValues.NOMBRE,
            APELLIDO: CLIENTE.dataValues.APELLIDO,
            CORREO: CLIENTE.dataValues.CORREO,
            CELULAR: CLIENTE.dataValues.CELULAR,

        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            OK: false,
            MSG: 'Error contacte al administrador'
        })
        next(err);
    }
}


/**
 * Se crea la cuenta 
 */
controller.crearCuenta = async function post(req, res, next) {
        // First, we start a transaction and save it into a variable
        const t = await db.sequelize.transaction();
        try {

            let CLIENTEUPDATE = getClienteUpdate(req);
            let CLIENTECUENTA = getClienteCuenta(req);
            const salt = bcrypt.genSaltSync();
            console.log("clienteupdate", CLIENTEUPDATE);
            const CLIENTECORREO = await CLIENTES.findOne({
                where: {
                    [Op.and]: [{
                            CORREO: CLIENTEUPDATE.CORREO
                        },
                        {
                            NUM_CUENTA: {
                                [Op.ne]: CLIENTEUPDATE.NUM_CUENTA
                            }
                        }
                    ]
                },
            });
            console.log("cliente", CLIENTECORREO);
            if (CLIENTECORREO) {
                return res.status(404).json({
                    OK: false,
                    MSG: 'El correo ingresado ya existe '
                })
            }
            const UPDATECLIENTE = await CLIENTES.update(
                CLIENTEUPDATE, {
                    where: { // buscamos el cliente para actualizar sus datos
                        NUM_CUENTA: CLIENTEUPDATE.NUM_CUENTA
                    },
                    transaction: t
                });

            if (!UPDATECLIENTE) {
                return res.status(404).json({
                    OK: false,
                    MSG: 'Error al actualizar los datos '
                })
            }


            CLIENTECUENTA.PASSWORD = bcrypt.hashSync(CLIENTECUENTA.PASSWORD, salt);
            const NEWCUENTA = await USUARIOS.findOrCreate({
                where: { // buscamos si existe el usuario

                    usuario: CLIENTECUENTA.USUARIO
                },
                // Si el usuario no existe crea el registro con el objeto clientecuenta
                transaction: t,
                defaults: CLIENTECUENTA
            });
            if (!NEWCUENTA[0]._options.isNewRecord) {
                return res.status(201).json({
                    OK: false,
                    MSG: 'EL USUARIO INGRESADO YA EXISTE '
                });
            }
            // If the execution reaches this line, no errors were thrown.
            // We commit the transaction.
            await t.commit();
            return res.status(201).json({
                OK: true,
                MSG: 'CUENTA CREADA SATISFACTORIAMENTE',
                DATA: NEWCUENTA[0].dataValues
            });
        } catch (err) {
            console.log(err);
            // If the execution reaches this line, an error was thrown.
            // We rollback the transaction.
            await t.rollback();
            next(err);
        }
    }
    /**
     * Se accede con el usuario y contraseña a la aplicación
     */
controller.login = async function post(req, res, next) {
        try {
            let login = getLoginUsuario(req);
            //console.log("login", login);
            const USUARIO = await USUARIOS.findOne({
                include: [{
                    model: CLIENTES,
                    as: 'CLIENTE_USUARIO',
                    required: true,
                    attributes: ['NOMBRE', 'APELLIDO', 'CORREO', 'CELULAR', 'NUM_CUENTA']
                }],
                where: {
                    [Op.or]: [{
                            USUARIO: login.USUARIO
                        },
                        {
                            '$CLIENTE_USUARIO.CORREO$': login.USUARIO
                        }, {
                            '$CLIENTE_USUARIO.NUM_CUENTA$': login.USUARIO
                        }
                    ]
                },
            });
            if (!USUARIO) {
                return res.status(404).json({
                    OK: false,
                    MSG: 'usuario no encontrado'
                })
            }
            // Verificar contraseña
            const validPassword = bcrypt.compareSync(login.PASSWORD, USUARIO.dataValues.PASSWORD)
            if (!validPassword) {
                return res.status(404).json({
                    OK: false,
                    MSG: 'contraseña incorrecta'
                })
            }
            //Generar el token
            const token = await generarJWT(USUARIO.dataValues.ID, USUARIO.dataValues.USUARIO, USUARIO.dataValues.CLIENTE_USUARIO.NUM_CUENTA);
            //Validado
            return res.status(201).json({
                OK: true,
                MSG: 'credenciales correctas',
                NUM_CUENTA: USUARIO.dataValues.CLIENTE_USUARIO.NUM_CUENTA,
                USUARIO: USUARIO.dataValues.USUARIO,
                NOMBRE: USUARIO.dataValues.CLIENTE_USUARIO.NOMBRE,
                APELLIDO: USUARIO.dataValues.CLIENTE_USUARIO.APELLIDO,
                CORREO: USUARIO.dataValues.CLIENTE_USUARIO.CORREO,
                CELULAR: USUARIO.dataValues.CLIENTE_USUARIO.CELULAR,
                TOKEN: token
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                OK: false,
                MSG: 'Error contacte al administrador'
            })
            next(err);
        }
    }
    /**
     * Se verifica si el numero de cuenta existe en el sistema
     */
controller.recuperarPassword = async function post(req, res, next) {
    try {
        let correo = req.query.CORREO;
        const CLIENTE = await USUARIOS.findOne({
            include: [{
                model: CLIENTES,
                as: 'CLIENTE_USUARIO',
                required: true,
                attributes: ['CORREO']
            }],
            where: { '$CLIENTE_USUARIO.CORREO$': correo }
        })
        if (!CLIENTE) {
            return res.status(201).json({
                OK: false,
                MSG: 'Usted no tiene una cuenta registrada'
            })
        }
        const fullhash = await crearEnviarHash(correo);
        console.log("fuldds", fullhash);
        //Validado
        return res.status(201).json({
            OK: true,
            MSG: 'Si existe cliente',
            hash: fullhash
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            OK: false,
            MSG: 'Error contacte al administrador'
        })
        next(err);
    }
}
controller.validarRecuperacionPassword = async function post(req, res, next) {
    try {
        const correo = req.body.CORREO;
        const otp = req.body.OTP;
        const hash = req.body.HASH;
        let [hashValue, expires] = hash.split(".");
        let now = Date.now();
        if (now > parseInt(expires)) {
            res.status(200).json({
                estado: 'timeout'
            });
            return false;
        }
        let data = `${correo}.${otp}.${expires}`;
        let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
        if (newCalculatedHash === hashValue) {
            res.status(200).json({
                estado: 'valido'
            });
            return true;
        }
        res.status(200).json({
            estado: 'novalido'
        });
        return false;
    } catch (err) {
        next(err);
    }


}

function getClienteUpdate(req) {
    const clienteUpdate = {
        NUM_CUENTA: req.body.NUM_CUENTA,
        CORREO: req.body.CORREO,
        CELULAR: req.body.CELULAR,
    };
    return clienteUpdate;
}

function getClienteCuenta(req) {
    const clienteCuenta = {
        USUARIO: req.body.USUARIO,
        PASSWORD: req.body.PASSWORD,
        ID_CLIENTE: req.body.NUM_CUENTA
    };
    return clienteCuenta;
}

function getLoginUsuario(req) {
    const usuario = {
        USUARIO: req.body.USUARIO,
        PASSWORD: req.body.PASSWORD
    };
    return usuario;
}

function getAuthRegistroBody(req) {
    const usuario = {
        NUM_CUENTA: req.body.NUM_CUENTA
    };
    return usuario;
}
module.exports = controller;
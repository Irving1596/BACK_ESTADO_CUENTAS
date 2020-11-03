const db = require("../models/init-models.js");
const models = db.initModels(db.sequelize);
const CLIENTES = models.CLIENTES;
const PROPIEDADES = models.PROPIEDADES;
const URBANIZACIONES = models.URBANIZACIONES;
const LOTES = models.LOTES;
const C_SERVICIOS = models.C_SERVICIOS;
const SERVICIOS = models.SERVICIOS;
const C_FACTURA = models.C_FACTURA;
const USUARIOS = models.USUARIOS;

const bcrypt = require('bcrypt');
const Op = db.Sequelize.Op;
const { obtenerDataUsuario } = require('../helpers/jwt');



const controller = {};

/**
 * Se genera el recibo 
 */
controller.generarRecibo = async function get(req, res, next) {
    try {
        let usuario = obtenerDataUsuario(req);
        const CLIENTE_FACTURA = await C_FACTURA.findAll({
            include: [{
                model: C_SERVICIOS,
                as: 'FACTURA_SERVICIO',
                required: false,
                attributes: ['ID'],
                include: [{
                    model: PROPIEDADES,
                    as: 'PROPIEDAD_SERVICIO',
                    required: false,
                    attributes: ['ID'],
                    include: [{
                        model: URBANIZACIONES,
                        as: 'URBANIZACION',
                        required: false,
                        attributes: ['NOMBRE']
                    }, {
                        model: LOTES,
                        as: 'LOTE',
                        required: false,
                        attributes: ['NUM_LOTE', 'NOMBRE']
                    }]
                }, {
                    model: SERVICIOS,
                    as: 'SERVICIO',
                    required: false,
                    attributes: ['NOMBRE', 'DESCRIPCION']
                }],
            }],
            where: {
                [Op.and]: [{
                        '$FACTURA_SERVICIO.ID_CLIENTE$': usuario.NUM_CUENTA
                    },
                    {
                        PAGO_REALIZADO: 0
                    }
                ]
            },

            /*
                        where: {
                            ID_CLIENTE: usuario.NUM_CUENTA
                        },*/
            attributes: ['ID', 'FECHA', 'MONTO_PAGAR']
        });
        return res.status(201).json({
            OK: true,
            MSG: 'RECIBO',
            NUM_CUENTA: usuario.NUM_CUENTA,
            CLIENTE_FACTURA
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
 * SE OBTIENE LAS URBANIZACIONES DEL CLIENTE 
 */
controller.urbanizaciones = async function get(req, res, next) {
        try {
            let usuario = obtenerDataUsuario(req);
            const CLIENTE_URBANIZACIONES = await PROPIEDADES.findAll({
                include: [{
                    model: URBANIZACIONES,
                    as: 'URBANIZACION',
                    required: true,
                    attributes: ['ID', 'NOMBRE']
                }],
                where: {
                    ID_CLIENTE: usuario.NUM_CUENTA
                },
                attributes: ['ID']
            });
            return res.status(201).json({
                OK: true,
                MSG: 'URBANIZACIONES',
                NUM_CUENTA: usuario.NUM_CUENTA,
                CLIENTE_URBANIZACIONES
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
     * SE OBTIENE LOS LOTES DEL CLIENTE
     */
controller.lotes = async function get(req, res, next) {
    try {
        let idUrbanizacion = req.query.URBANIZACION;
        let usuario = obtenerDataUsuario(req);
        console.log("QUERY", idUrbanizacion);
        const CLIENTE_LOTES = await PROPIEDADES.findAll({
            include: [{
                model: URBANIZACIONES,
                as: 'URBANIZACION',
                required: true,
                attributes: ['ID'],
                model: LOTES,
                as: 'LOTE',
                required: false,
                attributes: ['ID', 'NUM_LOTE', 'NOMBRE']
            }],
            where: {
                [Op.and]: [{
                        ID_URBANIZACION: idUrbanizacion
                    },
                    {
                        ID_CLIENTE: usuario.NUM_CUENTA
                    }
                ]
            },
            attributes: ['ID']
        });
        return res.status(201).json({
            OK: true,
            MSG: 'URBANIZACIONES',
            NUM_CUENTA: usuario.NUM_CUENTA,
            CLIENTE_LOTES
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

//update
controller.actualizarDatos = async function put(req, res, next) {
    try {
        let usuarioActualizado = getUsuarioUpdate(req);
        let usuario = obtenerDataUsuario(req);

        const DATOS_ACTUALIZADOS = await CLIENTES.update(
            usuarioActualizado, {
                where: { // buscamos el cliente para actualizar sus datos
                    NUM_CUENTA: usuario.NUM_CUENTA
                }
            });
        console.log("DATOS ACTUALIZADOS");
        return res.status(201).json({
            OK: true,
            MSG: 'DATOS ACTUALIZADOS SATISFACTORIAMENTE',
            DATOS_ACTUALIZADOS
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            OK: false,
            MSG: 'Error inesperado'
        })
        next(err);
    }
}

controller.actualizarContrasena = async function put(req, res, next) {
    try {
        let usuarioNewPassword = updatePassword(req);
        let usuario = obtenerDataUsuario(req);
        let CONTRASENA_ACTUALIZADA = [0];

        const USUARIO = await USUARIOS.findOne({
            where: {
                ID_CLIENTE: usuario.NUM_CUENTA
            },
        });
        // Verificar contraseña
        console.log("objeto", usuarioNewPassword);
        const validPassword = bcrypt.compareSync(usuarioNewPassword.OLDPASSWORD, USUARIO.dataValues.PASSWORD)
        if (!validPassword) {
            return res.status(404).json({
                OK: false,
                MSG: 'contraseña incorrecta'
            })
        }
        let newPassword = {}
        newPassword = { PASSWORD: usuarioNewPassword.PASSWORD };
        const salt = bcrypt.genSaltSync();
        newPassword.PASSWORD = bcrypt.hashSync(newPassword.PASSWORD, salt);
        CONTRASENA_ACTUALIZADA = await USUARIOS.update(
            newPassword, {
                where: { // buscamos el cliente para actualizar sus datos
                    ID_CLIENTE: usuario.NUM_CUENTA
                }
            });
        return res.status(201).json({
            OK: true,
            MSG: 'CONTRASEÑA ACTUALIZADA SATISFACTORIAMENTE',
            CONTRASENA_ACTUALIZADA
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            OK: false,
            MSG: 'Error inesperado'
        })
        next(err);
    }
}

function getUsuarioUpdate(req) {
    const usuarioupdate = {
        CORREO: req.body.CORREO,
        CELULAR: req.body.CELULAR
    };
    return usuarioupdate;
}

function updatePassword(req) {
    const passwordupdate = {
        PASSWORD: req.body.PASSWORD,
        OLDPASSWORD: req.body.OLDPASSWORD,
    };
    return passwordupdate;
}
module.exports = controller;
const express = require('express');
const routerCliente = new express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar_campos');
const cliente = require('../../controllers/cliente.js');
const { validarJWT } = require('../../middlewares/validar-jwt');

/**
 * Se obtiene la data del recibo
 *  */
routerCliente.get('/generarRecibo', validarJWT,
    cliente.generarRecibo);

/**
 * Se obtiene las urbanizaciones
 *  */
routerCliente.get('/urbanizaciones', validarJWT,
    cliente.urbanizaciones);
/**
 * Se obtiene los lotes
 *  */
routerCliente.get('/lotes', [
        check('URBANIZACION', 'La urbanizacion es un campo obligatorio').not().isEmpty(),
    ], validarCampos, validarJWT,
    cliente.lotes);
/**
 * Se actualizan los datos del cliente
 *  */
routerCliente.put('/actualizarDatos', validarJWT,
    cliente.actualizarDatos);

/**
 * Se actualiza la contraseña
 *  */
routerCliente.put('/actualizarPassword', [
        check('OLDPASSWORD', 'El password actual es un campo obligatorio').not().isEmpty(),
        check('PASSWORD', 'El nuevo password es un campo obligatorio ').not().isEmpty(),
    ], validarCampos, validarJWT,
    cliente.actualizarContrasena);

module.exports = routerCliente;
const express = require('express');
const routerAuth = new express.Router();
const { check } = require('express-validator');
const { validarCampos } = require('../../middlewares/validar_campos');
const auth = require('../../controllers/auth.js');
const { validarJWT } = require('../../middlewares/validar-jwt');

/**
 * LOGIN DE VERIFICACION DE CUENTA 
 *  */
routerAuth.post('/registro', [
        check('NUM_CUENTA', 'El numero de cuenta es obligatorio').not().isEmpty(),
    ], validarCampos,
    auth.authRegistro);

/**
 * Creación de cuenta 
 *  */
routerAuth.post('/registroCrearCuenta', [
        check('NUM_CUENTA', 'El numero de cuenta es obligatorio').not().isEmpty(),
        check('USUARIO', 'El usuario es obligatorio').not().isEmpty(),
        check('PASSWORD', 'La contraseña es obligatorio').not().isEmpty(),
        check('CORREO', 'El email es obligatorio').not().isEmpty(),
        check('CORREO', 'El email ingresado no es valido').isEmail(),
    ], validarCampos,
    auth.crearCuenta);

/**
 * LOGIN 
 *  */
routerAuth.post('/login', [
        check('USUARIO', 'El usuario es obligatorio').not().isEmpty(),
        check('PASSWORD', 'La contraseña es obligatoria').not().isEmpty(),
    ], validarCampos,
    auth.login);


/**
 * OLVIDE MI CONTRASENA
 *  */
routerAuth.get('/olvideContrasena', [
        check('CORREO', 'El email es obligatorio').not().isEmpty(),
        check('CORREO', 'El email ingresado no es valido').isEmail(),
    ], validarCampos,
    auth.recuperarPassword);

/**
 * VALIDAR OLVIDE MI CONTRASENA
 *  */
routerAuth.post('/verificarOlvideContrasena', [
        check('CORREO', 'El email es obligatorio').not().isEmpty(),
        check('CORREO', 'El email ingresado no es valido').isEmail(),
        check('OTP', 'El OTP es obligatorio').not().isEmpty(),
        check('HASH', 'El HASH es obligatorio').not().isEmpty(),
    ], validarCampos,
    auth.validarRecuperacionPassword);
module.exports = routerAuth;
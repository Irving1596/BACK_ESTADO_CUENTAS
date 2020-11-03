const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");
var DataTypes = require("sequelize").DataTypes;
var _CLIENTES = require("./CLIENTES");
var _PROPIEDADES = require("./PROPIEDADES");
var _LOTES = require("./LOTES");
var _C_FACTURA = require("./C_FACTURA");
var _SERVICIOS = require("./SERVICIOS");
var _C_SERVICIOS = require("./C_SERVICIOS");
var _URBANIZACIONES = require("./URBANIZACIONES");
var _USUARIOS = require("./USUARIOS");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
    // operatorsAliases: false,
    pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.initModels = function initModels(sequelize) {
    var CLIENTES = _CLIENTES(sequelize, DataTypes);
    var PROPIEDADES = _PROPIEDADES(sequelize, DataTypes);
    var LOTES = _LOTES(sequelize, DataTypes);
    var C_FACTURA = _C_FACTURA(sequelize, DataTypes);
    var SERVICIOS = _SERVICIOS(sequelize, DataTypes);
    var C_SERVICIOS = _C_SERVICIOS(sequelize, DataTypes);
    var URBANIZACIONES = _URBANIZACIONES(sequelize, DataTypes);
    var USUARIOS = _USUARIOS(sequelize, DataTypes);
    //El target key referencia por defecto al primary key, como mi forenkey no es el primary key, necesito especificarlo
    USUARIOS.belongsTo(CLIENTES, { as: 'CLIENTE_USUARIO', 'foreignKey': 'ID_CLIENTE', targetKey: 'NUM_CUENTA' });
    //CLIENTES.hasOne(USUARIOS, { as: 'CLIENTE_USUARIO', 'foreignKey': 'NUM_CUENTA' });
    // CLIENTES.hasMany(PROPIEDADES, { 'foreignKey': 'NUM_CUENTA' }, { targetKey: 'NUM_CUENTA' });
    CLIENTES.hasMany(PROPIEDADES, { as: 'CLIENTE_PROPIEDADES', 'foreignKey': 'ID' });
    PROPIEDADES.belongsTo(CLIENTES, { as: 'CLIENTE_PROPIEDADES', 'foreignKey': 'ID_CLIENTE', targetKey: 'NUM_CUENTA' });
    URBANIZACIONES.hasMany(PROPIEDADES, { as: 'URBANIZACION', 'foreignKey': 'ID' });
    PROPIEDADES.belongsTo(URBANIZACIONES, { as: 'URBANIZACION', 'foreignKey': 'ID_URBANIZACION' });
    LOTES.hasMany(PROPIEDADES, { as: 'LOTE', 'foreignKey': 'ID' });
    PROPIEDADES.belongsTo(LOTES, { as: 'LOTE', 'foreignKey': 'ID_LOTE' });

    //servicios
    CLIENTES.hasMany(C_SERVICIOS, { as: 'CLIENTE_SERVICIO', 'foreignKey': 'ID' });
    C_SERVICIOS.belongsTo(CLIENTES, { as: 'CLIENTE_SERVICIO', 'foreignKey': 'ID_CLIENTE', targetKey: 'NUM_CUENTA' });
    PROPIEDADES.hasMany(C_SERVICIOS, { as: 'PROPIEDAD_SERVICIO', 'foreignKey': 'ID' });
    C_SERVICIOS.belongsTo(PROPIEDADES, { as: 'PROPIEDAD_SERVICIO', 'foreignKey': 'ID_PROPIEDAD' });
    SERVICIOS.hasMany(C_SERVICIOS, { as: 'SERVICIO', 'foreignKey': 'COD_SERVICIO', targetKey: 'COD_SERVICIO' });
    C_SERVICIOS.belongsTo(SERVICIOS, { as: 'SERVICIO', 'foreignKey': 'ID_SERVICIO', targetKey: 'COD_SERVICIO' });
    C_SERVICIOS.hasMany(C_FACTURA, { as: 'FACTURA_SERVICIO', 'foreignKey': 'ID' });
    C_FACTURA.belongsTo(C_SERVICIOS, { as: 'FACTURA_SERVICIO', 'foreignKey': 'ID_CSERVICIOS' });







    return {
        CLIENTES,
        PROPIEDADES,
        LOTES,
        C_FACTURA,
        SERVICIOS,
        C_SERVICIOS,
        URBANIZACIONES,
        USUARIOS,
    };
}
module.exports = db;
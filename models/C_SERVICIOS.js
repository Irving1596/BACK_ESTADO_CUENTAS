/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('C_SERVICIOS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ID_CLIENTE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'CLIENTES',
        key: 'num_cuenta'
      },
      unique: "FK_IDCLIENTE"
    },
    ID_SERVICIO: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'SERVICIOS',
        key: 'cod_servicio'
      },
      unique: "FK_IDSERVICIO"
    },
    ID_PROPIEDAD: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'PROPIEDADES',
        key: 'id'
      },
      unique: "FK_IDPROPIEDAD"
    },
    ESTADO: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "ACTIVO"
    }
  }, {
    sequelize,
    tableName: 'C_SERVICIOS',
    timestamps: true
    });
};

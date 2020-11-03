/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SERVICIOS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    COD_SERVICIO: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "COD_SERVICIO_UNIQUE"
    },
    NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    DESCRIPCION: {
      type: DataTypes.STRING(205),
      allowNull: true
    },
    TARIFA_MENSUAL: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'SERVICIOS',
    timestamps: false
    });
};

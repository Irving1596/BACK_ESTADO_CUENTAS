/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROPIEDADES', {
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
      unique: "FK_CUENTACLIENTE"
    },
    ID_URBANIZACION: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'URBANIZACIONES',
        key: 'id'
      },
      unique: "FK_IDURBANIZACION"
    },
    ID_LOTE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'LOTES',
        key: 'id'
      },
      unique: "FK_NUMLOTE"
    }
  }, {
    sequelize,
    tableName: 'PROPIEDADES',
    timestamps: true
    });
};

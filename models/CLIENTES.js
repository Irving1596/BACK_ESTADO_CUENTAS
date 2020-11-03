/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLIENTES', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NUM_CUENTA: {
      type: DataTypes.INTEGER(14),
      allowNull: false,
      unique: "NUM_CUENTA_UNIQUE"
    },
    NOMBRE: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    APELLIDO: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    SEXO: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    CORREO: {
      type: DataTypes.STRING(55),
      allowNull: false,
      unique: "CORREO_UNIQUE"
    },
    CELULAR: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'CLIENTES',
    timestamps: true
    });
};

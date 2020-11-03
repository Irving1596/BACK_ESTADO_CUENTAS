/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('LOTES', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ID_URBANIZACIONES: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'URBANIZACIONES',
        key: 'id'
      },
      unique: "LOTES_ibfk_1"
    },
    NUM_LOTE: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    NOMBRE: {
      type: DataTypes.STRING(55),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'LOTES',
    timestamps: true
    });
};

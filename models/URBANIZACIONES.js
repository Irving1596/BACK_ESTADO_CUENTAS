/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('URBANIZACIONES', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    NOMBRE: {
      type: DataTypes.STRING(70),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'URBANIZACIONES',
    timestamps: false
    });
};

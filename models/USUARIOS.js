/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USUARIOS', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ID_CLIENTE: {
      type: DataTypes.INTEGER(14),
      allowNull: false,
      references: {
        model: 'CLIENTES',
        key: 'num_cuenta'
      },
      unique: "USUARIOS_ibfk_1"
    },
    USUARIO: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "USUARIO_UNIQUE"
    },
    PASSWORD: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    ACTIVO: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'USUARIOS',
    timestamps: true
    });
};

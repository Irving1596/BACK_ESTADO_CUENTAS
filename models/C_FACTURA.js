/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('C_FACTURA', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    ID_CSERVICIOS: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'C_SERVICIOS',
        key: 'id'
      },
      unique: "C_FACTURA_ibfk_1"
    },
    FECHA: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    MONTO_PAGAR: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    PAGO_REALIZADO: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'C_FACTURA',
    timestamps: true
    });
};

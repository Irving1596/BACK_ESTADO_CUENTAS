const dbConfig = require("../config/database.js");

const Sequelize = require("sequelize");
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
//Models/tables
//db.tutorials = require("./Cliente.model.js")(sequelize, Sequelize);

module.exports = db;
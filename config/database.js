module.exports = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    db: process.env.DBNAME,
    dialect: "mysql",
    pool: {
        poolMin: 10,
        poolMax: 5,
        acquire: 30000,
        idle: 10000
    }

};
const dbConfig = require('../config/db.config');
const fs = require('fs');
const path = require('path');
const filebasename = path.basename(__filename);
const db = {};
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max, //maximum number of connection in pool
        min: dbConfig.pool.min, //minimum number of connection in pool
        acquire: dbConfig.pool.acquire, //maximum time, in milliseconds, that a connection can be idle before being released
        idle: dbConfig.pool.idle //maximum time, in milliseconds, that pool will try to get connection before throwing error
    },
});


// pegando os arquivos models e populando no array db

fs
    .readdirSync(__dirname)
    .filter((file) => {
        const returnFile = (file.indexOf('.') !== 0)
            && (file !== filebasename)
            && (file.slice(-3) === '.js');
        return returnFile;
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize)
        db[model.name] = model;
    });
//Implementando a chave estrangeira

Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

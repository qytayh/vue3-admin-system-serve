const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const Sequelize = require('sequelize');

const DB = {
    storage: path.join(__dirname, '../db/serve.db'), // 文件路径 
    host: 'localhost', // 地址 
    dialect: 'sqlite', // 目标数据库种类 
    dialectModule: sqlite3,
    pool: {
        max: 50,
        min: 0,
        idle: 10000
    }
}
const sq = new Sequelize(undefined, undefined, undefined, DB)

var db = {};

db.sequelize = sq;
db.Sequelize = Sequelize;

module.exports = db;

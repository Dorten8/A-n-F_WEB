//Getting Database working
const initSqlJs = require ('sql.js');

const SQL = await initSqlJs({
    locateFile: file =>"/data/database.db"
});
const db = new SQL.Database();

module.exports = db;

// db.run(""
const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = (db) = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Profile = require('../profile/profile.model')(sequelize);
    db.Follow = require('../follow/follow.model')(sequelize);

    // enter database associations here
    db.User.hasOne(db.Profile, {foreignKey: 'userId', targetKey: 'userId'});
    db.Profile.belongsTo(db.User, {foreignKey: 'id'});

    db.User.hasMany(db.Follow, {foreignKey: 'follower', as: 'follower', targetKey: 'follower'});
    db.User.hasMany(db.Follow, {foreignKey: 'followed', as: 'followed', targetKey: 'followed'});
    
    db.Follow.belongsTo(db.User, {foreignKey: 'followed', targetKey: 'id'});
    db.Follow.belongsTo(db.User, {foreignKey: 'follower', targetKey: 'id'});

    db.sequelize = sequelize;

    
    // sync all models with database
    await sequelize.sync();
}
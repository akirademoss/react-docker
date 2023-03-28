const { DataTypes } = require('sequelize');
const Profile = require('../profile/profile.model')
module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    const User = sequelize.define('User', attributes, options);


 

    console.log('wtf wtf WTF................. TESTING')

    return User;
}
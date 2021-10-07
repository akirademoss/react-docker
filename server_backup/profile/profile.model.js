const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        profile_pic: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        bio: { type: DataTypes.STRING, allowNull: true }
    };
    const options = {
        defaultScope: {
            // exclude hash by default
            //attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
           // withHash: { attributes: {}, }
        }
    };
    return sequelize.define('Profile', attributes, options);
}
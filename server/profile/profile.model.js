const { DataTypes } = require('sequelize');
const db = require('../_helpers/db');
module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: true },
        bio: { type: DataTypes.STRING, allowNull: true },
        link: { type: DataTypes.STRING, allowNull: true },
        previewImg: { type: DataTypes.STRING, allowNull: true  },
        previewImgKey: { type: DataTypes.STRING, allowNull: true  },
        userId: { type: DataTypes.INTEGER, allowNull: false },
    };

    const Profile = sequelize.define('Profile', attributes);
    
    return Profile;
}
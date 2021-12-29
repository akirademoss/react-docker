const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: true },
        bio: { type: DataTypes.STRING, allowNull: true },
        previewImg: { type: DataTypes.STRING, allowNull: true  },
        previewImgMobile: { type: DataTypes.STRING, allowNull: true  },
        thumbImg: { type: DataTypes.STRING, allowNull: true  },
        thumbImgMobile: { type: DataTypes.STRING, allowNull: true  },
        userId: { type: DataTypes.INTEGER, allowNull: true },
    };

    const Profile = sequelize.define('Profile', attributes);

    Profile.associate = function(model){
        Profile.belongsTo(model.User, {foreignKey: 'userId', as: 'id'})
    };

    return Profile;
}
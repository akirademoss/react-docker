const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = sequelize.define('Follow', {
        follower: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
        followed: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    },
    {
        indexes:[
         {
           unique: false,
           fields:['follower', 'followed']
         }
        ]
      });

    return attributes;
}
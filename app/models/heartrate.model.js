const db = require('../db/config')
const { DataTypes } = require('sequelize')

const heartrate = db.sequelize.define(
    'heartrate', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    status: { type: DataTypes.STRING(100) },
    data: { type: DataTypes.JSON()}
}, {
    paranoid: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: true
});

module.exports = heartrate
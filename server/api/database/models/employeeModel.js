const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');
const EmploymentRelationshipModel = require('./employmentRelationshipModel');

class EmployeeModel extends Model { }

EmployeeModel.init({
    // Model attributes are defined here
    dni: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_admission: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    // Other model options go here
    tableName: 'EMPLOYEES',
    sequelize, // We need to pass the connection instance
    modelName: 'EmployeeModel' // We need to choose the model name
});

EmployeeModel.belongsTo(EmploymentRelationshipModel, {
    foreignKey: 'employment_relationship',
});

EmploymentRelationshipModel.hasMany(EmployeeModel, {
    foreignKey: 'employment_relationship',
});

module.exports = EmployeeModel;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class EmploymentRelationshipModel extends Model { }

EmploymentRelationshipModel.init({
    // Model attributes are defined here
    id_employee_relationship: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        // allowNull defaults to true
    },
}, {
    // Other model options go here
    tableName: 'EMPLOYMENT_RELATIONSHIP',
    sequelize, // We need to pass the connection instance
    modelName: 'EmploymentRelationshipModel' // We need to choose the model name
});

module.exports = EmploymentRelationshipModel;

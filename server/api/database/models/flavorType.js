const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db')

class FlavorType extends Model { }

FlavorType.init({
    // Model attributes are defined here
    idFlavorType: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'id_type_flavor'
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: 'El nombre no puede ser null.'
            }
        },
        allowNull: false
    },
    description: {
        type: DataTypes.INTEGER,
        // allowNull defaults to true
    },
    price: {
        type: DataTypes.NUMBER,
        validate: {
            notNull: {
                msg: 'El precio no puede ser null.'
            },
            isInt: {
                msg: 'El precio debe ser un valor entero.'
            },
            len: {
                args: [1, 5],
                msg: 'El precio debe tener entre 1 y 5 cifras.',
            },
        },
        allowNull: false,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
    },
}, {
    // Other model options go here
    tableName: 'FLAVOR_TYPES',
    sequelize, // We need to pass the connection instance
    modelName: 'FlavorType' // We need to choose the model name
});

module.exports = FlavorType;

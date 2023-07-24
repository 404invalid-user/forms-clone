const { DataTypes } = require('sequelize');
export default function Form(sequelize: any) {
    const Form = sequelize.define('Form', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: String,
            required: true,
        },
        requireUserLogIn: {
            type: DataTypes.Boolean,
            allowNull: false,
            defaultValue: false
        },
        limitToOneResponce: {
            type: DataTypes.Boolean,
            allowNull: false,
            defaultValue: false            
        },
        requiredGuild: {
            type: DataTypes.String,
            allowNull: true
        },
        title: {
            type: DataTypes.String,
            allowNull: false,
        },
        description: {
            type: DataTypes.String,
            allowNull: true,
        },
    })

    Form.sync();
    return Form;
};
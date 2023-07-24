const { DataTypes } = require('sequelize');

export default function FormAnswer(sequelize: any) {

    const FormAnswer = sequelize.define('FormAnswer', {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        formId: {
            type:DataTypes.INTEGER,
            allowNull:false
        },
        userId: {
            type: DataTypes.String,
            allowNull: true,
        },

        IP: {
            type: DataTypes.String,
            allowNull: true,
        },
        region: {
            type: DataTypes.Sring,
            allowNull:true
        },
        timeTaken: {
            type: DataTypes.String,
            allowNull: true
        },
    })

    FormAnswer.sync();
    return FormAnswer;
};


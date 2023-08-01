const { DataTypes } = require('sequelize');

export default function FormQuestion(sequelize: any) {
    const FormQuestion = sequelize.define('FormQuestion', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        formId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        page: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        pagePosition: {
            type: DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 1
        },
        title: {
            type: DataTypes.String,
            allowNull: false,
        },
        description: {
            type: DataTypes.Sring,
            allowNull: true
        },
        questionType: {
            type: DataTypes.String,
            allowNull: false,
            defaultValue:'text'
        },
        
    })


    FormQuestion.sync();

    return FormQuestion;

};




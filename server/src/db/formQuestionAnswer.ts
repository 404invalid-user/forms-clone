const { DataTypes } = require('sequelize');

export default function FormQuestionAnswer(sequelize: any) {
  const FormQuestionAnswer = sequelize.define('FormQuestionAnswer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    formAnswerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    formQuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  });

  FormQuestionAnswer.sync();
  return FormQuestionAnswer;
};




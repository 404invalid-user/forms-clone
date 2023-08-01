const { DataTypes } = require('sequelize');

export default function FormQuestionOption(sequelize: any) {
  const FormQuestionOption = sequelize.define('FormQuestionOption', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    formId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    formQuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.String,
      allowNull: false
    },
  });

  FormQuestionOption.sync();
  return FormQuestionOption;
};
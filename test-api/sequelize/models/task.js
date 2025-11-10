"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {}

  Task.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING, 
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Task",
      timestamps: true, 
    }
  );
  return Task;
};

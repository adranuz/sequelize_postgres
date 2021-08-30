import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/database";
// import Project from "./Project";
const Task = sequelize.define('tasks', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true, 
  },
  name: { type: DataTypes.TEXT },
  done: { type: DataTypes.BOOLEAN },
  projectid: { type: DataTypes.INTEGER }
},{
  timestamps: false
})

// Project.hasMany(Task, {foreignKey: 'projectid', sourceKey: 'id'})
// Task.belongsTo(Project, { foreignKey: 'projectid', sourceKey: 'id'})

export default Task
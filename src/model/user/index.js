import { DataTypes } from "sequelize";
import sequelize from "../../dbConnection/config.js";
// sequelize = new sequelize("sqlite::memory:");

const UserModel = sequelize.define(
    "User", 
    {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default UserModel;

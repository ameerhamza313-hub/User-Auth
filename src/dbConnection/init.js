import UserModel from "../model/user/index.js";
import sequelize from "./config.js";

const syncDB = async () => {

await sequelize.sync({alter: true, force: false});
console.log('All models were synchronized successfully.');
};
export default syncDB;
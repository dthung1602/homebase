import { Sequelize } from "sequelize";
import config from "../config.js";

const sequelize = new Sequelize(config.DB_URI);

export default sequelize;

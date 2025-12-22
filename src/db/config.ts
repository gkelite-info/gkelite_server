import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME as string;
const dbHost = process.env.DB_HOST as string;
const dbUsername = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined;

function getConnection() {
  return new Sequelize(dbName, dbUsername, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
}

const sequelizeConnection = getConnection();
export default sequelizeConnection;

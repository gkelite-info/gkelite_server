import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    logging: console.log,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection successful");
    await sequelize.close();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
})();

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

(async () => {
  try {
    await db.authenticate();
    console.log("Conexión establecida exitosamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
})();


export default db;

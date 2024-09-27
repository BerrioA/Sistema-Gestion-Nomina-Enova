import { Sequelize } from "sequelize";

const db = new Sequelize("consolidados_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

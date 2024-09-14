import { Sequelize } from "sequelize";

const db = new Sequelize("db_nomina", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

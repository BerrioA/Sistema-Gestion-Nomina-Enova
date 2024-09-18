import { Sequelize } from "sequelize";

const db = new Sequelize("eneva_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

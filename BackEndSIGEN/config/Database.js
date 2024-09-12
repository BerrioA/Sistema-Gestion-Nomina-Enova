import { Sequelize } from "sequelize";

const db = new Sequelize("gestion_nomina_enova", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

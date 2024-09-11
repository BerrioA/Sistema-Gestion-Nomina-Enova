const DATABASE = require("mysql");

const CONEXION = DATABASE.createConnection({
  host: "localhost",
  database: "gestion_nomina_enova",
  user: "root",
  password: "root",
});

CONEXION.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Conexion Exitosa.");
  }
});

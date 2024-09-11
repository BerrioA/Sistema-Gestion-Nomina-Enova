import mysql from "mysql2/promise";

async function connectDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      database: "gestion_nomina_enova",
      user: "root",
      password: "root",
    });
    console.log("Conexión Exitosa.");
    return connection;
  } catch (err) {
    console.error("Error de conexión:", err);
    throw err; // Re-throw the error after logging it
  }
}

(async () => {
  const connection = await connectDatabase();
  // Use the connection here

  // When done, make sure to close the connection
  await connection.end();
})();

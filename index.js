import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import SedesRoute from "./routes/SedeRoute.js";
import CargoRoute from "./routes/CargoRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import NominaRoute from "./routes/NominaRoute.js";
import EmpleadoRoute from "./routes/EmpleadoRoute.js";
import CoordinadorRoute from "./routes/CoordinadorRoute.js";
import AutenticacionRoute from "./routes/AutenticacionRoute.js";
import Cargos, { initializeCargos } from "./models/CargoModel.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
// })();

// (async () => {
//   try {
//     await initializeCargos(); // Inicializar los datos de cargos
//     console.log("Servidor y base de datos inicializados correctamente.");
//   } catch (error) {
//     console.error("Error al inicializar el servidor:", error);
//   }
// })();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { secure: "auto" },
  })
);

//MIDDLEWARES
//Funcion encargada de recibir las solicitudes junto con las cookies al incluir las credenciales.
app.use(
  cors({
    //Dominios con accedo a la API
    origin: ["http://localhost:5173", "https://sigen-nomina.vercel.app"],
    credentials: true,
    httpOnly: true, // Evita acceso desde JavaScript en el navegador
  sameSite: "lax",
  })
);
app.use(express.json());
app.use(SedesRoute);
app.use(CargoRoute);
app.use(AdminRoute);
app.use(CoordinadorRoute);
app.use(EmpleadoRoute);
app.use(AutenticacionRoute);
app.use(NominaRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Servidor corriendo con exito en el puerto ${process.env.APP_PORT}!`
  );
});

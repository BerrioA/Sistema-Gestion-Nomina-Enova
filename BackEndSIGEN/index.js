import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import AdminRoute from "./routes/AdminRoute.js";
import EmpleadoRoute from "./routes/EmpleadoRoute.js";
import AutenticacionRoute from "./routes/AutenticacionRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

// (async () => {
//   await db.sync();
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
    credentials: true,
    //Dominios con accedo a la API
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.use(AdminRoute);
app.use(EmpleadoRoute);
app.use(AutenticacionRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Servidor corriendo con exito en el puerto ${process.env.APP_PORT}!`
  );
});

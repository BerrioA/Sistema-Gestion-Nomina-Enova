import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
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

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor corriendo con exito...!`);
});

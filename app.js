const express = require("express");
const app = express();
const { infocursos } = require("./datos/cursos");
const { routerMatematicas } = require("./Routers/matematicas");
const { routerProgramacion } = require("./Routers/programacion");
//rauter
app.use("/api/cursos/programacion", routerProgramacion);
app.use("/api/cursos/matematicas", routerMatematicas);

//routing
app.get("/", (req, res) => {
  res.send("MI PRIMER SERVIDOR con express !!!");
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infocursos));
});

//cursos de programacion

//cursos de matematicas

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  let visitantes = 0;
  console.log(
    `el servidor esta escuchando en el puerto http://localhost:${PUERTO}/`
  );
  visitantes++;
  console.log(`bienvenido visitante numero; ${visitantes}`);
});

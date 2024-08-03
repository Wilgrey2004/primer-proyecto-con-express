const express = require("express");

const app = express();

const { infocursos } = require("./cursos");
//rauter
const routerProgramacion = express.Router();
app.use("/api/cursos/programacion", routerProgramacion);

const routerMatematicas = express.Router();
app.use("/api/cursos/matematicas", routerMatematicas);

//routing
app.get("/", (req, res) => {
  res.send("MI PRIMER SERVIDOR con express !!!");
});

app.get("/api/cursos", (req, res) => {
  res.send(JSON.stringify(infocursos));
});

routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(infocursos.programacion));
});

routerMatematicas.get("/", (req, res) => {
  res.send(JSON.stringify(infocursos.matematicas));
});

//cursos de programacion
routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infocursos.programacion.filter(
    (curso) => curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`no se encontraron cursos del lenguaje ${lenguaje}`);
  }
  if (req.query.ordenar === "vistas") {
    res.send(JSON.stringify(resultados.sort((a, b) => a.vistas - b.vistas)));
  } else {
    res.send(JSON.stringify(resultados));
  }
  return res.send(JSON.stringify(resultados));
});

routerProgramacion.get("/:lenguaje/:nivel", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = infocursos.programacion.filter(
    (curso) => curso.nivel === nivel || curso.lenguaje === lenguaje
  );

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(
        `no se encontraron cursos del lenguaje ${lenguaje} de nivel ${nivel}`
      );
  }

  return res.send(JSON.stringify(resultados));
});

//cursos de matematicas

routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultados = infocursos.matematicas.filter(
    (cursos) => cursos.tema === tema
  );

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`no se encontraron cursos del lenguaje ${tema}`);
  }

  return res.send(JSON.stringify(resultados));
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
  console.log(
    `el servidor esta escuchando en el puerto http://localhost:${PUERTO}/`
  );
});

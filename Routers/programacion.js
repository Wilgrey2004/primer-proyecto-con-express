const express = require("express");

const { programacion } = require("../datos/cursos").infocursos;

const routerProgramacion = express.Router();
//Middleware
routerProgramacion.use(express.json());

routerProgramacion.get("/", (req, res) => {
  res.send(JSON.stringify(programacion));
});

routerProgramacion.get("/:lenguaje", (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = programacion.filter(
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
  const resultados = programacion.filter(
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

//http post

routerProgramacion.post("/", (req, res) => {
  let cursoNuevo = req.body;
  programacion.push(cursoNuevo);
  res.send(JSON.stringify(programacion));
});

//htto put
routerProgramacion.put("/:id", (req, res) => {
  const cursoAcualizado = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion[indice] = cursoAcualizado;
  }

  res.send(JSON.stringify(programacion));
});

//patch

routerProgramacion.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    const cursoAModificar = programacion[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }

  res.send(JSON.stringify(programacion));
});

//delete

routerProgramacion.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = programacion.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    programacion.splice(indice, 1);
  }
  res.send(JSON.stringify(programacion));
});

module.exports.routerProgramacion = routerProgramacion;

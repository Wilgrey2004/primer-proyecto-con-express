const express = require("express");

const { matematicas } = require("../datos/cursos").infocursos;

const routerMatematicas = express.Router();

//middleware

routerMatematicas.use(express.json());

routerMatematicas.get("/", (req, res) => {
  res.send(JSON.stringify(matematicas));
});

routerMatematicas.get("/:tema", (req, res) => {
  const tema = req.params.tema;
  const resultados = matematicas.filter((cursos) => cursos.tema === tema);

  if (resultados.length === 0) {
    return res
      .status(404)
      .send(`no se encontraron cursos del lenguaje ${tema}`);
  }

  return res.send(JSON.stringify(resultados));
});

//post
routerMatematicas.post("/", (req, res) => {
  const cursoNuevo = req.body;
  matematicas.push(cursoNuevo);

  res.send(JSON.stringify(matematicas));
});
//put
routerMatematicas.put("/:id", (req, res) => {
  let cursoAEditar = req.body;
  let id = req.params.id;

  let indice = matematicas.findIndex((curso) => curso.id == id);

  if (indice >= 0) {
    matematicas[indice] = cursoAEditar;
  }
  res.send(JSON.stringify(matematicas));
});
//patch
routerMatematicas.patch("/:id", (req, res) => {
  const infoActualizada = req.body;
  const id = req.params.id;

  const indice = matematicas.findIndex((cursos) => cursos.id == id);

  if (indice >= 0) {
    const cursoAModificar = matematicas[indice];
    Object.assign(cursoAModificar, infoActualizada);
  }

  res.send(JSON.stringify(matematicas));
});
//delete

routerMatematicas.delete("/:id", (req, res) => {
  const id = req.params.id;
  const indice = matematicas.findIndex((curso) => curso.id == id);
  if (indice >= 0) {
    matematicas.splice(indice, 1);
  }
  res.send(JSON.stringify(matematicas));
});
module.exports.routerMatematicas = routerMatematicas;

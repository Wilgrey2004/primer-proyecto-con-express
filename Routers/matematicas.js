const express = require("express");

const { matematicas } = require("../datos/cursos").infocursos;

const routerMatematicas = express.Router();

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

module.exports.routerMatematicas = routerMatematicas;

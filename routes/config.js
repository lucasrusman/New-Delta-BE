const express = require("express");

const conexion = require("../database");

const router = express.Router();

router.post("/crear", async(req, res, next) => {
  const {precioKm} = req.body
  conexion.query('INSERT INTO config (precioKm) VALUES (?); ', [precioKm], (error, rows)=>{
    if(error){console.log(error)}
    res.json({Status : "Config creada"})
  })
});

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    conexion.query('SELECT * FROM congig WHERE id = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {precioKm} = req.body;
  conexion.query('UPDATE config SET precioKm = ? WHERE id = ?', [ precioKm, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Config Actualizada' });
      } else {
        console.log(err);
      }
    }
  );
});
  
    
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM config WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Config eliminada' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

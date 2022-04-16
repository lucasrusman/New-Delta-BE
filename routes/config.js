const express = require('express');

const conexion = require('../database');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/crear', [checkAuth], async (req, res, next) => {
  const { precioKm } = req.body;
  conexion.query('INSERT INTO config (precioKm) VALUES (?); ', [precioKm], (error, rows) => {
    if (error) {
      console.log(error);
    }
    res.json({ Status: 'Config creada' });
  });
});

router.get('/', [checkAuth], (req, res, next) => {
  conexion.query('SELECT * FROM config', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/', [checkAuth], (req, res) => {
  const { precioKm } = req.body;
  conexion.query('UPDATE config SET precioKm = ?', [precioKm], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Config Actualizada' });
    } else {
      console.log(err);
    }
  });
});

router.delete('/:id', [checkAuth], (req, res) => {
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

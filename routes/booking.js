const express = require('express');

const conexion = require('../database');

const router = express.Router();

router.post('/crear', async (req, res, next) => {
  const { email, fecha, desde, hasta, distancia, precio, estado, auto } = req.body;
  conexion.query(
    'INSERT INTO reservas (email, fecha, desde, hasta, distancia, precio, estado, auto) VALUES (?, ?, ?, ?, ?, ?, ?, ?); ',
    [email, fecha, desde, hasta, distancia, precio, estado, auto],
    (error, rows) => {
      if (error) {
        console.log(error);
      }
      res.json({ Status: 'Reserva creada' });
    }
  );
});



router.post('/cancelar', async (req, res, next) => {
  const idReserva = req.body.idReserva;
  conexion.query(
    'UPDATE reservas SET estado = 2 WHERE (id = ?);',
    [idReserva],
    (error, rows) => {
      if (error) {
        console.log(error);
        res.status(200).json({ status: "fail" })
      }
      res.status(200).json({ status: "ok" })
    }
  );
});

router.post('/completar', async (req, res, next) => {
  const idReserva = req.body.idReserva;
  conexion.query(
    'UPDATE reservas SET estado = 3 WHERE (id = ?);',
    [idReserva],
    (error, rows) => {
      if (error) {
        console.log(error);
        res.status(200).json({ status: "fail" })
      }
      res.status(200).json({ status: "ok" })
    }
  );
});




router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM reservas', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM reservas WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { email, fecha, desde, hasta, distancia, precio, estado, auto } = req.body;
  conexion.query(
    'UPDATE reservas SET email = ?, fecha = ?, desde = ?, hasta = ?, distancia = ?, precio = ?, estado = ?, auto = ? WHERE id = ?',
    [email, fecha, desde, hasta, distancia, precio, estado, auto, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Reserva Actualizada' });
      } else {
        console.log(err);
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM reservas WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Reserva eliminada' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

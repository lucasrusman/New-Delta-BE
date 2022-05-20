const express = require('express');

const conexion = require('../database');

const router = express.Router();

router.post('/crear', async (req, res, next) => {
  const { email, fecha, desde, hasta, distancia } = req.body;
  if (distancia) {
    conexion.query('Select * FROM config', (error, rows) => {
      if (error) {
        console.log(error);
      } else {
        precio = distancia * rows[0].precioKm;
        estado = '1';
        conexion.query(
          'INSERT INTO reservas (email, fecha, desde, hasta, distancia, precio, estado) VALUES (?, ?, ?, ?, ?, ?, ?); ',
          [email, fecha, desde, hasta, distancia, precio, estado],
          (error, rows) => {
            if (error) {
              console.log(error);
            }
            res.json({ Status: 'Reserva creada' });
          }
        );
      }
    });
  }
});

router.post('/cancelar', async (req, res, next) => {
  const idReserva = req.body.idReserva;
  conexion.query('UPDATE reservas SET estado = 2 WHERE (id = ?);', [idReserva], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(200).json({ status: 'fail' });
    }
    res.status(200).json({ status: 'ok' });
  });
});

router.post('/completar', async (req, res, next) => {
  const idReserva = req.body.idReserva;
  conexion.query('UPDATE reservas SET estado = 3 WHERE (id = ?);', [idReserva], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(200).json({ status: 'fail' });
    }
    res.status(200).json({ status: 'ok' });
  });
});

router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM reservas ORDER BY id DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});

//Este es el endpoint que trae la informacion de la reserva dado un ID

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


//Este es el endpoint que devuelve "Nueva" segun si el email tiene una reserva

router.post('/estado', (req, res, next) => {
  const { email } = req.body;
  conexion.query('SELECT * FROM reservas WHERE email = ?', [email] ,(err, rows, fields) => {
    if (!err) {
      const estado = rows[0].estado
      if(rows.length > 0){
        if(estado === "1"){
          res.json({Status : "El usuario posee una reserva ya en curso", Code: 1, Desde: rows[0].desde, Hasta: rows[0].hasta});
        }else{
          res.json({Status : "El usuario NO posee reservas en curso.", Code: 2})
        }
      }
      
    } else {
      console.log(err);
    }
  });
});





router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { email, fecha, desde, hasta, distancia, estado, auto } = req.body;
  conexion.query('SELECT * FROM config', (error, rows) => {
    if (error) {
      console.log(error);
    }
    if (rows.length === 0) {
      //aca no se establecio nunca el precio por km
      res.json({ Status: 'Se produjo un error, comuniquese con el administrador' });
    } else {
      precio = distancia * rows[0].precioKm;
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
    }
  });
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

router.post('/asignar/:id', async (req, res, next) => {
  const { id } = req.params;
  const { auto } = req.body;
  conexion.query('UPDATE reservas SET auto = ? WHERE (id = ?);', [auto, id], (error, rows) => {
    if (error) {
      console.log(error);
      res.status(200).json({ status: 'fail' });
    }
    res.status(200).json({ status: 'ok' });
  });
});

module.exports = router;

const express = require("express");
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");

const conexion = require("../database");

const router = express.Router();

router.post("/signup", async(req, res, next) => {
  const {patente, password} = req.body
  const passHash = await bcryptjs.hash(password, 10)
  const rol = '3'
  conexion.query('INSERT INTO choferes (patente, password, rol) VALUES (?, ?, ?); ', [patente, passHash, rol], (error, rows)=>{
    if(error){console.log(error)}
    res.json({Status : "Chofer registrado"})
  })
});


//NO FUNCIONA LOGOUT
router.post('/logout', (req, res, next) =>{
  localStorage.removeItem('token')
  sessionStorage.removeItem('token')
  if (!token){
    res.status(401).json({
      message: "Logout failed"
    });
  }
  res.status(200).json({
    Status : "Logout correcto"
  })
})


router.get('', (req, res, next) => {
  conexion.query('SELECT * FROM choferes ORDER BY id DESC', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  conexion.query('SELECT * FROM choferes WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { patente, password} = req.body;
  const passHash = await bcryptjs.hash(password, 10);
  const rol = '3'
  conexion.query(
    'UPDATE choferes SET patente = ?, password= ? , rol = ? WHERE id = ?',
    [patente, passHash,rol, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: 'Chofer Actualizado' });
      } else {
        console.log(err);
      }
    }
  );
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  conexion.query('DELETE FROM choferes WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Chofer eliminado' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;

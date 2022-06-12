const express = require("express");
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken");

const conexion = require("../database");

const router = express.Router();

router.post("/signup", async(req, res, next) => {
  const {patente, password} = req.body
  const passHash = await bcryptjs.hash(password, 10)
  const rol = 3
  conexion.query('INSERT INTO choferes (patente, password, rol) VALUES (?, ?, ?); ', [patente, passHash, rol], (error, rows)=>{
    if(error){console.log(error)}
    res.json({Status : "Chofer registrado"})
  })
});


router.post("/loginChoferes",(req, res, next) => {
  try {
    const {patente, password} = req.body
        //si no te manda email o pass
        if(!patente || !password){
            res.json({Status : "Ingrese la patente y/o password"})
        }else{
            conexion.query('SELECT * FROM choferes WHERE patente = ?', [patente], async(error, rows)=>{
                if( rows.length == 0 || !(await bcryptjs.compare(password, rows[0].password)) || rows[0].rol !== 3 ){
                    res.json({Status : "Email/Password/Rol incorrectos"})
                }else{
                       //inicio de sesión OK
                    const patente = rows[0].patente
                    const password = rows[0].password
                    const id = rows[0].id
                    // se crea el token
                    const token = jwt.sign(
                      { patente, password},
                      "secret_this_should_be_longer",
                      { expiresIn: "1h" }
                    );
                    res.status(200).json({
                      token,
                      id,
                      expiresIn: 3600,
                      Status : "Login correcto"
                    });
            }
        })
        }
  } catch (error) {
      return res.status(401).json({
        message: "Auth failed"
      });
  }
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


module.exports = router;

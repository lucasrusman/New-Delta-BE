const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : '',
    database : "newdelta",
    port: 3306
})

conexion.connect( (error)=> {
    if(error){
        throw error;
    }
    console.log('¡Conectado a la base de datos MySQL!')
})

module.exports = conexion
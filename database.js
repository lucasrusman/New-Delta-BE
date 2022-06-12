const mysql = require('mysql')

const conexion = mysql.createPool({
    host : "localhost",
    user : "root",
    password : '',//'1682951!Abmtoba',
    database : "newdelta",
    //port: 3306
})

// host : "us-cdbr-east-05.cleardb.net",
// user : "b70093c2684c0d",
// password : 'bc3ee38e',//'1682951!Abmtoba',
// database : "heroku_39f477a2e268fee",

// conexion.connect( (error)=> {
//     if(error){
//         throw error;
//     }
//     console.log('¡Conectado a la base de datos MySQL!')
// })

module.exports = conexion
const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
global.app = express()

global.knex = require('knex')({
  client : 'mysql',

  connection: {
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : '',
    database : 'bacod_cofeshop'
  }
})



// global.koneksi = mysql.createConnection({
//     host      : 'localhost',
//     user      : 'root',
//     password  : '',
//     database  : 'bacod_cofeshop'
//   });

 

app.use(cors())
app.use(express.json())
//koneksi.connect();

//require('./controller/menu')
require('./controller/menuknex')
require('./controller/transaction')

app.listen(3000)

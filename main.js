const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()


const koneksi = mysql.createConnection({
    host      : 'localhost',
    user      : 'root',
    password  : '',
    database  : 'bacod_cofeshop'
  });


app.use(cors())
app.use(express.json())
koneksi.connect();

app.get('/menu', function (req, res) {

  koneksi.query('SELECT * FROM menu', function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  });
})

app.post('/menu', (req, res) => {
  const data = req.body

  koneksi.query(`INSERT INTO menu (name, description, price, stock) VALUES ('${data.name}', '${data.description}', '${data.price}', '${data.stock}')`, (error, results, fields) => {
    if (error) throw error;
    res.json(results)
  })

})

app.listen(3000)

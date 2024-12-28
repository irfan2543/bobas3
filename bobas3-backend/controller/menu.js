// //Create
// app.post('/menu', (req, res) => {
//     const data = req.body
  
//     koneksi.query(`INSERT INTO menu (name, description, price, stock) VALUES ('${data.name}', '${data.description}', '${data.price}', '${data.stock}')`, (error, results, fields) => {
//       if (error) throw error;
//       res.json(results)
//     });
//   })
  
//   //Read
//   app.get('/menu', function (req, res) {
  
//     koneksi.query('SELECT * FROM menu', function (error, results, fields) {
//       if (error) throw error;
//       res.json(results)
//     });
//   })
  
//   //Update
//   app.put('/menu/:id', (req, res) => {
  
//     const primaryKey = req.params.id
//     const data = req.body
  
//     koneksi.query(`UPDATE menu SET name = '${data.name}', price = '${data.price}', stock = '${data.stock}' where id = '${primaryKey}'`, (error, results, fields) => {
  
//       if(error) throw error;
//       res.json(results)
  
//     })
//   })
  
//   //Delete
//   app.delete('/menu/:id', (req, res) => {
//     const primaryKey = req.params.id
  
//     koneksi.query(`DELETE FROM menu WHERE id = '${primaryKey}'`, (error, results, fields) => {
  
//       if(error) throw error;
//       res.json(results)
//     });
//   })
  
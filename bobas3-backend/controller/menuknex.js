
app.get('/menu', async(req, res) => {
    const results = await knex('menu').select();
    res.json(results)
})

app.post('/menu', async(req, res) => {

    const data = req.body

    const send = await knex('menu').insert({
        name : data.name,
        description : data.description,
        image : data.image,
        price : data.price,
        stock : data.stock
    })
    res.json(send)
})

app.delete('/menu/:id', async (req,res) => {

    const primaryKey = req.params.id
    const dlte = await knex('menu').where("id", primaryKey).del()
    
    res.json(dlte)
})

app.put('/menu/:id', async (req, res) => {
    const primaryKey = req.params.id
    const data = req.body

    const updt = await knex('menu').where("id", primaryKey).update({
        name : data.name,
        description : data.description,
        image : data.image,
        price : data.price,
        stock : data.stock
    })

    res.json(updt)
})
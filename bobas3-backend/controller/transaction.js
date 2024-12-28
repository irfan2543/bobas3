app.post('/transactions', async(req, res) => {

    const data = req.body
    const menuRestaurant = data.menu

        let dateID = new Date()
        let purchaseTransactionID = dateID.getTime()

        const sendTransaction = await knex('transactions').insert({
            id : purchaseTransactionID,
            buyer : data.buyer,
            cashier : data.cashier,
        })

        const sendTransactionMenu = await knex('transaction_menu').insert(
            menuRestaurant.map((menu) => ({
              transaction_id: purchaseTransactionID,
              menu_id: menu.id,
              quantity: menu.quantity
            }))
          )        
    res.json(sendTransaction)
})

app.get('/transactions', async(req, res) => {
    const results = await knex('transactions').select();
    res.json(results)
})
const express = require("express")

const ProductManager = require("./main")


const app = express()

const newProd = new ProductManager('productos.json')

app.get("/products", async (req, res) => {

    const products = await newProd.getProducts()

    const limit = req.query.limit

    if(limit){
        res.json(products.slice(0,parseInt(limit)))
    } else {
        res.json(products)
    }

})

app.get("/products/:pid", async (req, res) => {

    const pid = parseInt(req.params.pid)
    const prod = await newProd.getProductById(pid)
    res.json(prod)

})


app.listen(8080)
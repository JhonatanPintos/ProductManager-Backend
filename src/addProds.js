const ProductManager = require("./main")

async function run() {
    const newProd = new ProductManager("productos.json")
    await newProd.addProd("Leche", "Lacteos", 120, "foto", null)
    await newProd.addProd("Mani", "Comida", 40, "foto", null)
    await newProd.addProd("Auriculares", "Computacion", 500, "foto", null)
    await newProd.addProd("TV 32'", "Electrodomesticos", 1200, "foto", null)
    await newProd.addProd("Mesa de luz", "Muebles", 600, "foto", null)
    await newProd.addProd("Mochila", "Varios", 80, "foto", null)
    console.log("-----------Todos los Productos-----------");
    console.log(await newProd.getProducts());
    console.log("-----------Productos por ID-----------");
    //console.log(await newProd.getProductById(2));
    //console.log(await newProd.getProductById(5));
    //console.log(await newProd.getProductById(8));
    console.log("-----------Nueva Lista (Borrada)-----------");
    //await newProd.deleteById(1)
    //console.log(await newProd.getProducts());
    console.log("-----------Nueva Lista (Editada)-----------");
    //await newProd.updateProduct(2, "Auriculares", "Computacion", 500, "foto", null)
    //console.log(await newProd.getProducts());
    console.log("-----------SE BORRO TODO-----------");
    //await newProd.deleteAll()
    console.log("-----------Fin de Codigo-----------");
}

run()
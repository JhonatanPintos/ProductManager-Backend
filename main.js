const {promises: fs} = require("fs")

class ProductManager {

    constructor(path) {
        this.path = path
    }

    getProducts() {
        return fs.readFile(this.path, "utf-8")
        .then(content => JSON.parse(content))
        .catch(e => {
            console.log("ERROR", e)
            return []
        })
    }

    async getProductById(id) {
        const loading = await this.getProducts()
        const serch = loading.find(item => item.id === id)
        if(serch == undefined){
            return "Product Not Found"
        } else {
            return serch
        }
    }
    
    addProd = async (title, description, price, thumbnail, stock) => {
        return this.getProducts()
        .then(prod => {
            let newId
            if (prod.length == 0) {
              newId = 1
            } else {
              newId = prod[prod.length - 1].id + 1
            }
    
            let newCode = Math.floor(Math.random(1) * 10000)
            const copiCode = prod.some(item => item.code === newCode)
            if(copiCode === true){
                newCode = "ERROR"
            }
                const product = {
                    id: newId,
                    title,
                    description,
                    price,
                    thumbnail,
                    stock: stock ?? 50,
                    code: newCode
                }
                prod.push(product)
                return prod
        })
        .then(newProd => fs.writeFile(this.path, JSON.stringify(newProd)))
        .catch(e => {
            console.log("ERROR ACA", e)
        })
    }

    async deleteById(id) {
        const allProd = await this.getProducts()
        const index = allProd.findIndex(o => o.id == id)
        if (index == -1) {
          throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }
    
        allProd.splice(index, 1)
        try {
          await fs.writeFile(this.path, JSON.stringify(allProd, null, 2))
        } catch (error) {
          throw new Error(`Error al borrar: ${error}`)
        }
      }
    
      async deleteAll() {
        await fs.writeFile(this.path, JSON.stringify([], null, 2))
      }

      updateProduct = async(id, title, description, price, thumbnail, stock) => {
        const allProd = await this.getProducts()
        const index = allProd.findIndex(o => o.id == id)
        if (index == -1) {
          throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }
        allProd.splice(index, 1)
        try {
            await fs.writeFile(this.path, JSON.stringify(allProd, null, 2))
          } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
          }
        return this.getProducts()
        .then(prod => {
            const product = {
                id: id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock ?? 50,
            }
            prod.push(product)
            return prod
        })
        .then(newProd => fs.writeFile(this.path, JSON.stringify(newProd)))
        .catch(e => {
            console.log("ERROR ACA", e)
        })
      }
}


async function run() {
    const newProd = new ProductManager("productos.json")
    await newProd.addProd("Leche", "Lacteos", 120, "foto", null)
    await newProd.addProd("Mani", "Comida", 40, "foto", null)
    //await newProd.addProd("Auriculares", "Computacion", 500, "foto", null)
    await newProd.addProd("TV 32'", "Electrodomesticos", 1200, "foto", null)
    //await newProd.addProd("Mesa de luz", "Muebles", 600, "foto", null)
    //await newProd.addProd("Mochila", "Varios", 80, "foto", null)
    console.log("-----------Todos los Productos-----------");
    console.log(await newProd.getProducts());
    console.log("-----------Productos por ID-----------");
    console.log(await newProd.getProductById(2));
    console.log(await newProd.getProductById(5));
    console.log(await newProd.getProductById(8));
    console.log("-----------Nueva Lista (Borrada)-----------");
    await newProd.deleteById(1)
    console.log(await newProd.getProducts());
    console.log("-----------Nueva Lista (Editada)-----------");
    await newProd.updateProduct(2, "Auriculares", "Computacion", 500, "foto", null)
    console.log(await newProd.getProducts());
    console.log("-----------SE BORRO TODO-----------");
    //await newProd.deleteAll()
    console.log("-----------Fin de Codigo-----------");
}

run()
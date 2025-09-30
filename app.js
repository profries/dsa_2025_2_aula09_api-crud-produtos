const express = require('express')
const produtoService = require("./service/produto_service")

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/produtos', async (req, res)=> {
    res.json(await produtoService.listar());
})


app.post('/produtos', async (req, res)=> {
    let produto = req.body;
    try { 
        produto = await produtoService.inserir(produto);
        res.status(201).json(produto);
    }
    catch(err) {
        res.status(err.id).json(err);
    }
})

app.get('/produtos/:id', async (req, res)=> {    
    const id = +req.params.id;
    try {
        res.json(await produtoService.buscarPorId(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
})

app.put('/produtos/:id', async (req, res)=> {
    const id = +req.params.id;
    let produto = req.body;
    try{
        res.json(await produtoService.atualizar(id, produto));
    } catch(err) {
        res.status(err.id).json(err);
    }
})

app.delete('/produtos/:id', async (req, res)=> {
    const id = +req.params.id;
    try {
        res.json(await produtoService.deletar(id));
    } catch(err) {
        res.status(err.id).json(err);
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

let listaProdutos = [];
let autoIncrement = 1;

function listar() {
    return Promise.resolve(listaProdutos);
}

function inserir(produto) {
    produto.id = autoIncrement++;
    listaProdutos.push(produto);
    return Promise.resolve(produto);
}

function buscarPorId(id) {
    return Promise.resolve(listaProdutos.find(
        function(produto) {
            return (produto.id == id);        
        }
    ));
}

function buscarIndicePorId(id) {
    return listaProdutos.findIndex((produto) => produto.id === id);
}

function atualizar(id, produtoAtual) {
    let indice = buscarIndicePorId(id);
    if(indice >= 0) {
        produtoAtual.id = id; 
        listaProdutos[indice] = produtoAtual;
        return Promise.resolve(listaProdutos[indice]);
    }
    return Promise.resolve(undefined);
}

function deletar(id) {
    let indiceProduto = buscarIndicePorId(id);
    if(indiceProduto >= 0) {
        let produtoRemovido = listaProdutos.splice(indiceProduto, 1)[0];
        return produtoRemovido;
    }
    return Promise.resolve(undefined);

}

function pesquisarPorCategoria(categoria) {
    return Promise.resolve(listaProdutos.filter( (produto) => produto.categoria == categoria ));
}

function pesquisarPorNomeLike(nome) {
    return Promise.resolve(listaProdutos.filter ( (produto) => {
        const produtoNomeUpper = produto.nome.toUpperCase();
        const nomeUpper = nome.toUpperCase();
        return (produtoNomeUpper.search(nomeUpper) >= 0);
    }));
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorCategoria,
    pesquisarPorNomeLike
}
function selecionarProduto(carrinho, id, nome, preco) {
  const produtoExistente = carrinho.find(p => p.id === id);
  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    carrinho.push({ id, nome, preco, quantidade: 1 });
  }
  return carrinho;
}

module.exports = { selecionarProduto };

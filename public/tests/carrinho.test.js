const { selecionarProduto } = require('../javascripts/carrinho');


describe('Função selecionarProduto', () => {
  it('adiciona um novo produto ao carrinho vazio', () => {
    const carrinho = [];
    const resultado = selecionarProduto(carrinho, 'produto1', 'Santorine', 4500);

    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toEqual({
      id: 'produto1',
      nome: 'Santorine',
      preco: 4500,
      quantidade: 1
    });
  });

  it('incrementa a quantidade de um produto existente', () => {
    const carrinho = [
      { id: 'produto1', nome: 'Santorine', preco: 4500, quantidade: 1 }
    ];
    const resultado = selecionarProduto(carrinho, 'produto1', 'Santorine', 4500);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].quantidade).toBe(2);
  });

  it('adiciona outro produto diferente', () => {
    const carrinho = [
      { id: 'produto1', nome: 'Santorine', preco: 4500, quantidade: 1 }
    ];
    const resultado = selecionarProduto(carrinho, 'produto2', 'Orlando', 5000);

    expect(resultado).toHaveLength(2);
    expect(resultado[1]).toEqual({
      id: 'produto2',
      nome: 'Orlando',
      preco: 5000,
      quantidade: 1
    });
  });
});

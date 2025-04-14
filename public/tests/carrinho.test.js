const { selecionarProduto } = require('../javascripts/carrinho');

// Teste criado por Kevin Gabriel
// Testes para carrinho


describe('Função selecionarProduto', () => {

  // Test para adicionar um novo produto ao carrinho
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

  // Test para incrementar a quantidade de um produto existente
  it('incrementa a quantidade de um produto existente', () => {
    const carrinho = [
      { id: 'produto1', nome: 'Santorine', preco: 4500, quantidade: 1 }
    ];
    const resultado = selecionarProduto(carrinho, 'produto1', 'Santorine', 4500);

    expect(resultado).toHaveLength(1);
    expect(resultado[0].quantidade).toBe(2);
  });

  // Test para adicionar um novo produto diferente
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

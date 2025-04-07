function selecionarprod(produto) {
    const ElementPrice = document.getElementsByClassName(`preco-${produto}`);
    const ElementName = document.getElementById(`info-${produto}`);


    let productPrice = parseFloat(ElementPrice[0].innerText.replace("R$", "").replace(",", ".").trim())
    let productDetalhes = ElementName.innerText.trim();

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    let novoProduto = {
        id: produto,
        nome: productDetalhes,
        preco: productPrice,
        quantidade: 1
    };

    let produtoExistente = carrinho.find(item => item.id === produto);
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push(novoProduto);
    }


    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("O produto foi adcionado")
    window.location.href = '/carrinho';
}


function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const CSSboxRule = document.querySelector('.box');
    const CSSCardRule = document.querySelector('.prod');
    const CSSconteinerRule = document.querySelector('.container');

    const prodimagens = {
        'produto1': 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0b/f6/2d/d1.jpg',
        'produto2': 'https://irp.cdn-website.com/e650cfd8/dms3rep/multi/thumb_orlando.png',
        'produto3': 'https://www.visiteosusa.com.br/sites/default/files/styles/hero_l/public/images/hero_media_image/2017-04/7010d1e88b80578f3d4e6fc09c2a2379.jpeg?h=84c61102&itok=1hAyAqUn',
        'produto4': 'https://assets.simpleviewinc.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/panama/Panama_City_skyline_2__0f0ec1be-1bc5-41ca-8af3-a137b61e387e.jpg',
        'produto5': 'https://einvestidor.estadao.com.br/wp-content/uploads/2024/06/adobestock-190654500_200620245628.jpeg',
        
        
    }

    let demoElement = document.getElementById("add");

    if (carrinho.length === 0) {
        CSSCardRule.remove();
        CSSboxRule.remove();

        CSSconteinerRule.innerHTML = `
        
        <h2> Seu carrinho está vazio </h2>


        `;

        CSSconteinerRule.style.color = 'red';

    }
    carrinho.forEach(produto => {
        let cardProd = `
        <div class="card-item">
            <img id="imagprod-${produto.id}" src="${prodimagens[produto.id]}" alt="Imagem do produto">
            <div class="info">
                <p id="info-${produto.id}">${produto.nome}</p>
                <div class="quantidade">
                    <button onclick="alterarQuantidade('${produto.id}', -1)">-</button>
                    <input type="text" id="quantidade-${produto.id}" value="${produto.quantidade}" readonly>
                    <button onclick="alterarQuantidade('${produto.id}', 1)">+</button>
                </div>
                <p id="preco-${produto.id}"> R$: ${produto.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <button class="remove" onclick="removerProduto('${produto.id}')"><i class="fa-solid fa-trash"></i></button>
        </div>`;
        demoElement.innerHTML += cardProd;
    });
}


function alterarQuantidade(produtoId, delta) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produto = carrinho.find(item => item.id === produtoId);

    if (produto) {
        produto.quantidade += delta;
        if (produto.quantidade <= 0) {
            removerProduto(produtoId);
        } else {
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            document.getElementById(`quantidade-${produtoId}`).value = produto.quantidade;
        }
    }

    resumoCompras();
}

function resumoCompras() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let frete = 0;
    let subtotal = 0

    carrinho.forEach(novoProduto => { subtotal += novoProduto.preco * novoProduto.quantidade });
    let total = subtotal + frete;

    document.getElementById('Subtotal').innerText = `Subtotal: R$${subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('Frete').innerText = `Frete: R$${frete.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('Total').innerText = `Total: R$${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    console.log(subtotal);
}

function removerProduto(produtoId) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const produtoIndex = carrinho.findIndex(produto => produto.id === produtoId);

    if (produtoIndex !== -1) {
        carrinho.splice(produtoIndex, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        window.location.reload();
        // carregarCarrinho();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarCarrinho();
    resumoCompras();
});

function finalizarPedido() {
    // Simula itens do carrinho
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const pedido = {
        itens: carrinho,
        data: new Date().toISOString(),
        total: carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0),
    };

    fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido),
    })
        .then(response => {
            if (response.ok) {
                alert("Pedido finalizado com sucesso!");
                localStorage.removeItem('carrinho');
                document.getElementById("add").innerHTML = ""; // Limpa o carrinho visualmente
                document.getElementById("Subtotal").innerText = "";
                document.getElementById("Frete").innerText = "";
                document.getElementById("Total").innerText = "";
            } else {
                alert("Erro ao finalizar o pedido. Tente novamente.");
            }
        })
        .catch(err => {
            console.error('Erro ao enviar o pedido:', err);
            alert("Erro ao finalizar o pedido. Tente novamente.");
        });
}

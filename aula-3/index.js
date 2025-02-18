const produtos = {
    banana: {
        nome: 'Banana',
        precoKg: 19.90,
        pesoKg: 0.5
    },
    maca: {
        nome: 'Maçã',
        precoKg: 12.99,
        pesoKg: 0.3
    },
    pera: {
        nome: 'Pera',
        precoKg: 12.90,
        pesoKg: 0.2
    },
    uva: {
        nome: 'Uva',
        precoKg: 29.90,
        pesoKg: 0.1
    }
};

function calcularDesconto(preco, desconto) {
    return preco - (preco * desconto / 100);
}

let total = 0;

for (let produto in produtos) {
    const { nome, precoKg, pesoKg } = produtos[produto];
    
    const preco = precoKg * pesoKg;
    const desconto = calcularDesconto(preco, 10);
    total += desconto;

    console.log(`🛒 Produto: ${nome}`);
    console.log(`  💵 Preço Original: R$ ${preco.toFixed(2)}`);
    console.log(`  💰 Desconto: 10%`);
    console.log(`  ✅ Preço Final: R$ ${desconto.toFixed(2)}`);
    console.log('----------------------');
}

console.log('🛒 Total: R$ ' + total.toFixed(2));


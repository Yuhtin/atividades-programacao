// Classe base Produto
class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }

    // Método para aplicar um desconto de 10%
    calculateDiscount() {
        return this.preco * .9;
    }
}

// Classe Livro que estende Produto
class Livro extends Produto {
    constructor(nome, preco, autor) {
        super(nome, preco); // Chama o construtor da classe mãe Produto
        this.autor = autor;
    }

    // Sobresceve o método para um desconto de 20%
    calculateDiscount() {
        return this.preco * .8;
    }
}

// Criando instâncias para teste
const product1 = new Produto("Caixa Vazia", 100);
console.log(`Preço com desconto (Produto): R$ ${product1.calculateDiscount()}`);
// Output que deve aparecer: "Preço com desconto (Produto): R$ 90"

const book1 = new Livro("Memórias Póstumas", 40, "Brás Cubas");
console.log(`Preço com desconto (Memórias Póstumas): R$ ${book1.calculateDiscount()}`);
// Output que deve aparecer: "Preço com desconto (Memórias Póstumas): R$ 32"


function sum(numbers) {
    // Inicializa a variável acumuladora
    let total = 0;

    // Corrige "size" para "length" e declara "i" com let
    for (let i = 0; i < numbers.length; i++) {
        // Ajuste no operador de atribuição: antes, o "=" sobrescrevia a variável soma a cada iteração. Agora, com "+=", os valores são acumulados corretamente.
        total += 2 * numbers[i];
    }

    return total; // Retorna a soma acumulada
}

console.log(sum([2, 4, 6, 8])); // Resultado esperado: 4+8+12+16 = 40
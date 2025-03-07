class Carro {
    constructor(marca, modelo, ano, cor, preco) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.preco = preco;
    }

    descricao() {
        console.log(`Este é um ${this.marca} ${this.modelo} ano ${this.ano}, na cor ${this.cor} e custa R$ ${this.preco.toFixed(2)}`);
    }
}

class CarroNovo extends Carro {
    constructor(marca, modelo, ano, cor, preco, garantia) {
        super(marca, modelo, ano, cor, preco);
        this.preco = preco - 500;
        this.garantia = garantia;
    }

    ofertaEspecial() {
        console.log(`Aproveite nossa oferta especial para o novo ${this.marca} ${this.modelo}! Por apenas R$ ${this.preco.toFixed(2)}, você leva o carro com ${this.garantia} anos de garantia!`);
    }
}

const carro = new Carro('Chevrolet', 'Onix', 2020, 'prata', 50000);
carro.descricao();

const carroNovo = new CarroNovo('Chevrolet', 'Onix', 2025, 'prata', 50000, 5);
carroNovo.descricao();
carroNovo.ofertaEspecial();
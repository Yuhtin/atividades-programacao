function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class Carro {
    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    ligar() {
        console.log('Ligando o carro...');
        this.ligado = true;
        console.log(`Carro ${this.marca} - ${this.modelo} ${this.ano} ligado!`);
    }
}

class CarroEletrico extends Carro {

    constructor(marca, modelo, ano, bateria) {
        super(marca, modelo, ano);
        this.bateria = bateria;
    }

    async carregarBateria() {
        console.log(`Carregando a bateria do carro ${this.marca} - ${this.modelo} ${this.ano}...`);

        for (let i = 0; i < 10; i++) {
            this.bateria += 10;

            var progressBar = '';
            for (let j = 0; j < 10; j++) {
                if (j < this.bateria / 10) {
                    progressBar += '█';
                } else {
                    progressBar += '░';
                }
            }

            console.log(`Bateria: ${this.bateria}% [${progressBar}]`);
            await wait(500);
        }

        console.log('Bateria 100% carregada!');
    }

    ligar() {
        if (this.bateria < 0) {
            console.log('Carro não pode ser ligado, bateria abaixo de 100%');
            return;
        }

        console.log('Ligando o carro...');
        this.ligado = true;

        console.log(`Carro ${this.marca} - ${this.modelo} ${this.ano} ligado! Bateria: ${this.bateria}%`);
    }
}

let carro = new Carro('Chevrolet', 'Onix', 2020);
carro.ligar();
console.log(carro);

let carroEletrico = new CarroEletrico('Tesla', 'Model S', 2020, 0);

carroEletrico.ligar();
await carroEletrico.carregarBateria();
carroEletrico.ligar();

while (carroEletrico.ligado) {
    await wait(1000);

    if (carroEletrico.bateria > 0) {
        carroEletrico.bateria -= 10;
    }

    if (carroEletrico.bateria <= 0) {
        carroEletrico.ligado = false;
    }

    console.log(`Bateria: ${carroEletrico.bateria}%`);

    if (!carroEletrico.ligado) {
        console.log('Carro desligado, bateria acabou!');
    }
}
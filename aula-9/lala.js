// Classe base
class Animal {
    constructor(nome, especie, idade) {
        this.nome = nome;
        this.especie = especie;
        this.idade = idade;
    }
    
    exibirInformacoes() {
        return `Nome: ${this.nome}, Espécie: ${this.especie}, Idade: ${this.idade}`;
    }
}

// Classe derivada
class AnimalSelvagem extends Animal {
    constructor(nome, especie, idade, habitat) {
        super(nome, especie, idade);
        this.habitat = habitat;
    }

    exibirHabitat() {
        return `Habitat natural: ${this.habitat}`;
    }
}

class AnimalDomestico extends Animal {
    constructor(nome, especie, idade, nomeDono) {
        super(nome, especie, idade);
        this.nomeDono = nomeDono;
    }

    exibirDono() {
        return `Dono de ${this.nome}: ${this.nomeDono}`;
    }
}

const animal3 = new AnimalDomestico("Rex", "Cachorro", 3, "Carlos");
console.log(animal3.exibirInformacoes());
console.log(animal3.exibirDono());

// Instâncias e retornos
const animal1 = new Animal("Tico", "Macaco", 4);
const animal2 = new AnimalSelvagem("Nala", "Leoa", 5, "Savana Africana");
console.log(animal1.exibirInformacoes());
console.log(animal2.exibirInformacoes());
console.log(animal2.exibirHabitat());

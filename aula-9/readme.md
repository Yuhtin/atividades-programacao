# Perguntas Dissertativas

### Estrutura de Classes e Objetos
- **a)** Quais atributos são definidos na classe Animal?
  - nome, especie, idade
- **b)** Como a classe AnimalSelvagem amplia a estrutura de Animal?
  - adiciona a variavel habitat

### Herança
- **c)** O que significa a linha class AnimalSelvagem extends Animal? 
  - AnimalSelvagem extende todos os metodos e variaveis/atributos da classe animal
- **d)** O que acontece internamente quando usamos o comando super(...) dentro do construtor da subclasse? 
  - Chamamos o construtor da classe mãe

### Instanciação
- **e)** O que ocorre passo a passo quando o comando new AnimalSelvagem("Nala", "Leoa", 5, "Savana Africana") é executado?
  - Cria uma nova instancia do objeto AnimalSelvagem contendos os parametros passados no construtor
- **f)** Qual a diferença entre a criação dos objetos animal1 e animal2?
  - O animal1 é do tipo Animal, não tem informações sobre o habitat. Já o animal2, é do tipo AnimalSelvagem e extende Animal, tem todas as informacoes de um animal, e a informacao adicional do habitat

### Acesso a Métodos
- **g)** Por que o método exibirInformacoes() pode ser utilizado tanto em animal1 quanto em animal2?
  - Pois o metodo foi implementado na classe Animal, que foi extendida pela classe AnimalSelvagem, logo, é possivel chamar o metodo da classe mae
- **h)** O método exibirHabitat() está disponível em animal1? Justifique sua resposta.
  - Não pois esta funcao foi implementada apenas na classe AnimalSelvagem, não foi definida na classe Animal

### Reutilização de Código
- **i)** Como a herança contribui para evitar duplicação de código nesse exemplo?
  - O metodo exibirInformacoes seria repetido na classe AnimalSelvagem se ela nao extendesse a classe Animal, claro, estamos num exemplo bem simples, mas em códigos maiores, isso salvaria muito tempo e ajudaria na manutenção do código.
- **j)** Se fosse necessário adicionar um novo comportamento a todos os animais, como "dormir()", em qual classe ele deveria ser implementado? Por quê?
  - A classe Animal, pois ela é a classe mãe, logo, todas as classes e tipos de Animais que fossem ser implementados, iriam herdar a função.

### Retorno e Impressão
- **k)** Qual é a saída exata exibida no console ao executar o código apresentado?
  - Nome: Tico, Espécie: Macaco, Idade: 4
  - Nome: Nala, Espécie: Leoa, Idade: 5
  - Habitat natural: Savana Africana
- **l)** O que aconteceria se fosse removida a linha super(nome, especie, idade) do construtor da classe AnimalSelvagem?
  - O javascript emite um erro, falando que o construtor precisa obrigatoriamente chamar o super construtor (construtor da classe mae) 

### 7. Prática de Extensão
- **m)** Crie uma nova subclasse chamada AnimalDomestico, que herda de Animal e inclui um novo atributo chamado nomeDono.
- **n)** Implemente um método chamado exibirDono() que retorne: "Dono de [nome do animal]: [nome do dono]".

```js
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
```
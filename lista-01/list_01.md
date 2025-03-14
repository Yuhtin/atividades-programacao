# Respostas Lista 1 de exercícios

# Instruções
- Faça uma cópia deste arquivo .md para um repositório próprio
- Resolva as 8 questões objetivas assinalando a alternativa correta e **justificando sua resposta.**
- Resolva as 2 questões dissertativas escrevendo no próprio arquivo .md
- Lembre-se de utilizar as estruturas de código como ``esta aqui com ` `` ou
```javascript
//esta aqui com ```
let a = "olá"
let b = 10
print(a)
```
- Resolva as questões com uso do Visual Studio Code ou ambiente similar.
- Teste seus códigos antes de trazer a resposta para cá.
- Cuidado com o uso de ChatGPT (e similares), pois entregar algo só para ganhar nota não fará você aprender. Não seja dependente da máquina!
- Ao final, publique seu arquivo lista_01.md com as respostas em seu repositório, e envie o link pela Adalove. 

# Questões objetivas
**1) Considerando a execução do código abaixo, indique a alternativa correta e justifique sua resposta.**
```javascript
console.log(x);
var x = 5;
console.log(y);
let y = 10;
```
**a) A saída será undefined seguido de erro**

b) A saída será 5 seguido de 10

c) A saída será undefined seguido de undefined

d) A saída será erro em ambas as linhas que utilizam console.log

### **Resposta:**

**Letra A**
A saída será "undefined" seguido por um erro.

(i) No primeiro `console.log(x)`, a variável x foi declarada, mas ainda não recebeu um valor, já que a atribuição de 5 ocorre posteriormente. Assim, o retorno será "undefined".

(ii) O `console.log(y)` tenta acessar y antes de sua declaração com `let y = 10`. Diferente do `var`, variáveis declaradas com `let` não ficam acessíveis antes da linha onde foram definidas, resultando em um erro e interrompendo a execução.


**2) O seguinte código JavaScript tem um erro que impede sua execução correta. Analise e indique a opção que melhor corrige o problema. Justifique sua resposta.**

```javascript
function soma(a, b) {
    if (a || b === 0) {
        return "Erro: número inválido";
    }
    return a + b;
}
console.log(soma(2, 0));
```

a) Substituir if (a || b === 0) por if (a === 0 || b === 0)

b) Substituir if (a || b === 0) por if (a === 0 && b === 0)

c) Substituir if (a || b === 0) por if (a && b === 0)

d) Remover completamente a verificação if (a || b === 0)

### **Resposta**

**Letra B**

Deve-se substituir por if (a === 0 || b === 0).

(i) O objetivo da condicional dentro da função soma é garantir que nenhum dos valores inseridos seja 0, retornando `"Erro: número inválido"` caso isso ocorra. Porém, a forma como a lógica foi estruturada apresenta um problema de prioridade na avaliação. O termo `b === 0` é processado primeiro, seguido do operador ||. Assim, em um caso como (0,3), o valor 3 será avaliado antes, tornando a condição falsa e impedindo a execução do bloco de erro.

**3) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
function calcularPreco(tipo) {
    let preco;

    switch(tipo) {
        case "eletrônico":
            preco = 1000;
        case "vestuário":
            preco = 200;
            break;
        case "alimento":
            preco = 50;
            break;
        default:
            preco = 0;
    }

    return preco;
}

console.log(calcularPreco("eletrônico"));
```

a) O código imprime 1000.

**b) O código imprime 200.**

c) O código imprime 50.

d) O código gera um erro.

### Resposta:

**Letra B**

O código exibirá 200 no console.

(i) O switch não contém um break após o case "eletrônico", que corresponde ao valor informado. Dessa maneira, o fluxo continua até encontrar o próximo break, localizado no case "vestuário", o que resulta no preço incorreto.

**4) Ao executar esse código, qual será a saída no console? Indique a alternativa correta e justifique sua resposta.**
```javascript
let numeros = [1, 2, 3, 4, 5];

let resultado = numeros.map(x => x * 2).filter(x => x > 5).reduce((a, b) => a + b, 0);

console.log(resultado);
```
a) 0

b) 6

c) 18

**d) 24**
______

### Resposta:

**Letra D**

(i) `.map(x => x * 2)` -> Multiplica cada elemento do array por 2: [2, 4, 6, 8, 10].
    `.filter(x => x > 5)` -> Filtra os valores que são maiores que 5: [6, 8, 10].
    `.reduce((a, b) => a + b, 0)` -> Soma os elementos filtrados a partir de 0: `0 + 6 + 8 + 10 = 24`.

**5) Qual será o conteúdo do array lista após a execução do código? Indique a alternativa correta e justifique sua resposta.**

```javascript
let lista = ["banana", "maçã", "uva", "laranja"];
lista.splice(1, 2, "abacaxi", "manga");
console.log(lista);
```

a) ["banana", "maçã", "uva", "abacaxi", "manga", "laranja"]

b) ["banana", "abacaxi", "manga"]

**c) ["banana", "abacaxi", "manga", "laranja"]**

d) ["banana", "maçã", "uva", "abacaxi", "manga"]
______

### Resposta:

**Letra C**

O array final será `["banana", "abacaxi", "manga", "laranja"]`.

(i) O método `splice(1, 2, "abacaxi", "manga")` modifica o array. O primeiro parâmetro (1) indica o índice onde a alteração começa ("maçã"), o segundo parâmetro (2) define quantos elementos serão removidos ("maçã" e "uva"), e os novos valores "abacaxi" e "manga" são inseridos no lugar.

**6) Abaixo há duas afirmações sobre herança em JavaScript. Indique a alternativa correta e justifique sua resposta**

I. A herança é utilizada para compartilhar métodos e propriedades entre classes em JavaScript, permitindo que uma classe herde os métodos de outra sem a necessidade de repetir código.  
II. Em JavaScript, a herança é implementada através da palavra-chave `extends`.


**a) As duas afirmações são verdadeiras, e a segunda justifica a primeira.**

b) As duas afirmações são verdadeiras, mas a segunda não justifica a primeira.

c) A primeira afirmação é verdadeira, e a segunda é falsa.

d) A primeira afirmação é falsa, e a segunda é verdadeira.
______

### Resposta:

**Letra A**

A herança facilita o compartilhamento de funcionalidades entre classes, evitando a repetição de código. A palavra chave `extends` permite que uma classe herde métodos e propriedades de outra.

**7) Dado o seguinte código. Indique a alternativa correta e justifique sua resposta.**

```javascript
class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }

  apresentar() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

class Funcionario extends Pessoa {
  constructor(nome, idade, salario) {
    super(nome, idade);
    this.salario = salario;
  }

  apresentar() {
    super.apresentar();
    console.log(`Meu salário é R$ ${this.salario}.`);
  }
}
```

I) A classe Funcionario herda de Pessoa e pode acessar os atributos nome e idade diretamente.  
II) O método `apresentar()` da classe Funcionario sobrepõe o método `apresentar()` da classe Pessoa, mas chama o método da classe pai usando `super`.  
III) O código não funciona corretamente, pois Funcionario não pode herdar de Pessoa como uma classe, já que o JavaScript não suporta herança de classes.

Quais das seguintes afirmações são verdadeiras sobre o código acima?

**a) I e II são verdadeiras.**

b) I, II e III são verdadeiras.

c) Apenas II é verdadeira.

d) Apenas I é verdadeira.

______

### Resposta:

**Letra A**

Afirmativa I - Correta. A classe `Funcionario` herda corretamente os atributos e métodos da classe base `Pessoa` por meio do `extends`.
Afirmativa II - Correta. A classe `Funcionario` sobrescreve o método `apresentar()`, mas utiliza super.`apresentar()` para chamar a versão original da classe-mãe.
Afirmativa III - Incorreta. JavaScript oferece suporte à herança de classes usando `extends`.

**8) Analise as afirmações a seguir. Indique a alternativa correta e justifique sua resposta.**

**Asserção:** O conceito de polimorfismo em Programação Orientada a Objetos permite que objetos de diferentes tipos respondam à mesma mensagem de maneiras diferentes.  
**Razão:** Em JavaScript, o polimorfismo pode ser implementado utilizando o método de sobrecarga de métodos em uma classe.

a) A asserção é falsa e a razão é verdadeira.

**b) A asserção é verdadeira e a razão é falsa.**

c) A asserção é verdadeira e a razão é verdadeira, mas a razão não explica a asserção.

d) A asserção é verdadeira e a razão é verdadeira, e a razão explica a asserção.

______

### Resposta:

**Letra B**

A afirmação é verdadeira, mas a justificativa é falsa.

Sobre a afirmação: Polimorfismo realmente permite que objetos diferentes respondam à mesma mensagem de maneiras distintas.

Sobre a justificativa: Está incorreta, pois JavaScript não suporta sobrecarga de métodos. Quando funções com o mesmo nome são definidas dentro de uma classe, apenas a última será considerada.

Exemplo:

```javascript
test(x) {
  console.log("Teste:", x);
}

test(x, y) {
  console.log("Sucesso:", x, y);
}

test(1);      // Resultado: "Sucesso: 1 undefined"
test(1, 2);   // Resultado: "Sucesso: 1 2"
```

Ambas as chamadas utilizam a segunda versão do método, provando que não há suporte para sobrecarga.

# Questões dissertativas
9) O seguinte código deve retornar a soma do dobro dos números de um array, mas contém erros. Identifique os problema e corrija o código para que funcione corretamente. Adicione comentários ao código explicado sua solução para cada problema.

```javascript
function somaArray(numeros) {

    for (i = 0; i < numeros.size; i++) {
        soma = 2*numeros[i];
    }
    return soma;
}
console.log(somaArray([1, 2, 3, 4]));
```
______

### Resposta:

```javascript
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
```

10) Crie um exemplo prático no qual você tenha duas classes:

- Uma classe `Produto` com atributos `nome` e `preco`, e um método `calcularDesconto()` que aplica um desconto fixo de 10% no preço do produto.
- Uma classe `Livro` que herda de `Produto` e modifica o método `calcularDesconto()`, aplicando um desconto de 20% no preço dos livros.

Explique como funciona a herança nesse contexto e como você implementaria a modificação do método na classe `Livro`.

```javascript
// Classe base Product
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // Método para aplicar um desconto de 20%
  calculateDiscount() {
    return this.price * .8;
  }
}

// Classe Phone que estende Product
class Phone extends Product {
  constructor(name, price, model) {
    super(name, price); // Chama o construtor da classe mãe Product
    this.model = model;
  }

  // Sobresceve o método para um desconto de 5%
  calculateDiscount() {
    return this.price * .95;
  }
}

// Criando instâncias para teste
const product1 = new Product("Caixa Vazia", 100);
console.log(`Preço com desconto (Produto): R$ ${product1.calculateDiscount()}`);
// Output que deve aparecer: "Preço com desconto (Produto): R$ 80"

const phone1 = new Phone("Iphone", 15000, "15 PRO Max");
console.log(`Preço com desconto (Iphone): R$ ${phone1.calculateDiscount()}`);
// Output que deve aparecer: "Preço com desconto (Iphone): R$ 14250"
```
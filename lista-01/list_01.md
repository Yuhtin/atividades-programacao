# Respostas Lista 1 de exercícios

## 1- (A)

A saída será "undefined" seguido por um erro.

(i) No primeiro `console.log(x)`, a variável x foi declarada, mas ainda não recebeu um valor, já que a atribuição de 5 ocorre posteriormente. Assim, o retorno será "undefined".

(ii) O `console.log(y)` tenta acessar y antes de sua declaração com `let y = 10`. Diferente do `var`, variáveis declaradas com `let` não ficam acessíveis antes da linha onde foram definidas, resultando em um erro e interrompendo a execução.

## 2- (A)

Deve-se substituir por if (a === 0 || b === 0).

(i) O objetivo da condicional dentro da função soma é garantir que nenhum dos valores inseridos seja 0, retornando `"Erro: número inválido"` caso isso ocorra. Porém, a forma como a lógica foi estruturada apresenta um problema de prioridade na avaliação. O termo `b === 0` é processado primeiro, seguido do operador ||. Assim, em um caso como (0,3), o valor 3 será avaliado antes, tornando a condição falsa e impedindo a execução do bloco de erro.

## 3- (B)

O código exibirá 200 no console.

(i) O switch não contém um break após o case "eletrônico", que corresponde ao valor informado. Dessa maneira, o fluxo continua até encontrar o próximo break, localizado no case "vestuário", o que resulta no preço incorreto.

## 4- (D)

(i) `.map(x => x * 2)` -> Multiplica cada elemento do array por 2: [2, 4, 6, 8, 10].
    `.filter(x => x > 5)` -> Filtra os valores que são maiores que 5: [6, 8, 10].
    `.reduce((a, b) => a + b, 0)` -> Soma os elementos filtrados a partir de 0: `0 + 6 + 8 + 10 = 24`.

## 5- (C)

O array final será `["banana", "abacaxi", "manga", "laranja"]`.

(i) O método `splice(1, 2, "abacaxi", "manga")` modifica o array. O primeiro parâmetro (1) indica o índice onde a alteração começa ("maçã"), o segundo parâmetro (2) define quantos elementos serão removidos ("maçã" e "uva"), e os novos valores "abacaxi" e "manga" são inseridos no lugar.

## 6- (A)

A herança facilita o compartilhamento de funcionalidades entre classes, evitando a repetição de código. A palavra chave `extends` permite que uma classe herde métodos e propriedades de outra.

## 7- (A)

Afirmativa I - Correta. A classe `Funcionario` herda corretamente os atributos e métodos da classe base `Pessoa` por meio do `extends`.
Afirmativa II - Correta. A classe `Funcionario` sobrescreve o método `apresentar()`, mas utiliza super.`apresentar()` para chamar a versão original da classe-mãe.
Afirmativa III - Incorreta. JavaScript oferece suporte à herança de classes usando `extends`.

## 8- (B)

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

## 9- Código consertado com comentários

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

## 10- Exemplo com Product e Phone

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

const listaDeTarefas = [];

listaDeTarefas.push("Estudar JavaScript");
listaDeTarefas.push("Fazer exercícios de matemática");
listaDeTarefas.push("Ler um livro");

console.log(`Número de tarefas na lista: ${listaDeTarefas.length}`);

listaDeTarefas.unshift("Fazer compras");
listaDeTarefas.splice(2, 0, "Reunião com equipe");
listaDeTarefas.push("Pagar contas");
listaDeTarefas.splice(
    listaDeTarefas.indexOf("Fazer exercícios de matemática"),
    1
);
listaDeTarefas.pop();

console.log(listaDeTarefas);
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');
//pego todos os elementos da pagina 
function criaTarefa(textoInput) {//cria uma tarefa com o texto do input (textoinput)
  const li = criaLi();//cria um item(li)para a tarefa
  li.innerText = textoInput;//usa o texto do input para fazer o item(li)
  tarefas.appendChild(li);//tarefas sera o PAI do item (li)
  limpaInput();
  criaBotaoApagar(li);//cria o botao apagar junto com o item adicionado(li)
  salvarTarefas();
}
//cria uma tarefa para isso eu crio um item(li) depois limpo o input(limpa input)
//, e junto com o item criado eu crio um botao apagar junto com o item
//criaBotaoApagar(li), no final salva a tarefa com a função (salavr tarefas)
function criaLi() {
  const li = document.createElement('li');
  return li;
}
// aqui eu crio um item(li) me retorna uma Li
function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}
//aqui o input é limpo apos o item adicionado e o cursor volta no input
function criaBotaoApagar(li) {
  li.innerText += ' ';
  const botaoApagar = document.createElement('button'); //cria o botao apagar
  botaoApagar.innerText = 'Apagar'; // o texto excrito nele
  botaoApagar.setAttribute('class', 'apagar'); // atributo dele Class="apagar"
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');// title="apagar esta tarefa"
  li.appendChild(botaoApagar); //o item é adicionado junto com o botão apagar
}
//aqui a Li e o botão apagar são criados juntos
// ******Li É PAI DO (botaoApagar)*******
inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});
//aqui se a tecla enter for apertada o item sera adiconado
btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});
//aqui se o botao "adicionar nova tarefa" for clicado o item sera adicionado
document.addEventListener('click', function(e) {
  const el = e.target; //uma const para saber onde o mouse esta sendo clicado

  if (el.classList.contains('apagar')) {//se o mouse clicar no botao"apagar"
    el.parentElement.remove();// o PAI do (botaoApagar) é removido junto com seu FILHO
    salvarTarefas();
  }
});
//aqui configuro o botao apagar
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');//seleciono todos os itens da lista com (querySelectorAll('li'))
  const listaDeTarefas = []; //crio um array

  for (let tarefa of liTarefas) {//para cada item na lista de tarefas
    let tarefaTexto = tarefa.innerText;//pego o elemento na lista
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();//apago o "apagar"
    listaDeTarefas.push(tarefaTexto);//puxo o tarefaTexto para o array listaDeTarefas
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); //tranforma esse array (listaDeTarefas) numa string
  localStorage.setItem('tarefas', tarefasJSON);//e guarda na base de dados(localStorage)
}
//salva as tarefas
function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');//pega os itens salvos (getItem)
  const listaDeTarefas = JSON.parse(tarefas);//transforma a string em um array

  for(let tarefa of listaDeTarefas) {//coloca as tarefas salvas de volta e recria elas
    criaTarefa(tarefa);//recriando as tarefas
  }

}
adicionaTarefasSalvas(); //tras de volta as tarefas salvas mesmo que atualize a pagina

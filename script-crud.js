// encontrar o botão "Adicionar tarefa"

const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');

// Caso não exista algo na LS, inicializa com ArrayVazio
const tarefas = JSON.parse( localStorage.getItem('tarefas') ) || [];

function atualizarTarefas () {
    localStorage.setItem( 'tarefas', JSON.stringify(tarefas) );
};


// Esta função cria um componente complexo,
// segundo o arquivo template : template-de-tarefa.tpl
function criarElementoTarefa( tarefa ) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `;

    const paragrafo = document.createElement('svg');
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    const imagemBotao = document.createElement('img');
    imagemBotao.setAttribute( 'src', './imagens/edit.png');

    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    botao.append( imagemBotao );
    botao.onclick = () => {
        const novaDescricao = prompt( "Qual é a nova Descrição da tarefa ?" );
        if (novaDescricao) {
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarTarefas();                
        }
    };

    li.append( svg );
    li.append( paragrafo );
    li.append( botao );
    return li;
}

btnAdicionarTarefa.addEventListener( 'click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    // Cria um Objeto
    const tarefa = {
        descricao: textArea.value
    };

    // Guarda o objeto no Array
    tarefas.push( tarefa );

    // Adiciona a nova tarefa na tela
    const elementoTarefa = criarElementoTarefa( tarefa );
    ulTarefas.append( elementoTarefa );

    // Guarda tarefa na LS
    atualizarTarefas();

    // Limpa o FORM e esconde
    textArea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', function() {
    const tarefasSalvas = JSON.parse( localStorage.getItem('tarefas') ) || [];
    tarefasSalvas.forEach( tarefa => {
        const elementoTarefa = criarElementoTarefa( tarefa );
        ulTarefas.append( elementoTarefa );
    });
})





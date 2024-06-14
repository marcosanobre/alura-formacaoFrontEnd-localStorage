// encontrar o botão "Adicionar tarefa"
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btnCancelarTarefa = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');

let   tarefaSelecionada = null;
let   liTarefaSelecionada = null;

// Caso não exista algo na LS, inicializa com ArrayVazio
let tarefas = JSON.parse( localStorage.getItem('tarefas') ) || [];

function atualizarLocalStorage () {
    localStorage.setItem( 'tarefas', JSON.stringify(tarefas) );
};

function limpaEescondeForm () {
    // Limpa o FORM e esconde
    textArea.value = '';
    formAdicionarTarefa.classList.toggle('hidden');
    //formAdicionarTarefa.classList.add('hidden');
};

function editarTarefa( tarefa, paragrafo ) {
    const novaDescricao = prompt( "Editar tarefa", tarefa.descricao );
    if (novaDescricao) {
        paragrafo.textContent = novaDescricao;
        tarefa.descricao = novaDescricao;
        atualizarLocalStorage();                
    };
}

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
        editarTarefa( tarefa, paragrafo );
    };

    li.append( svg );
    li.append( paragrafo );
    li.append( botao );

    if (tarefa.completa) {
        li.classList.add('app__section-task-list-item-complete');
        botao.setAttribute('disabled','disabled');
    } else {
        li.onclick = () => {
            // para garantir somente uma tarefa selecionada por vez - desselecionatudo
            document.querySelectorAll('.app__section-task-list-item-active').forEach( elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            });
    
            // Não faz nada caso click na tarefa ja selecionada
            if (tarefaSelecionada == tarefa) {
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null;
                return;
            };
    
            tarefaSelecionada = tarefa;
            liTarefaSelecionada = li;
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            // seleciona / marca somente o clickado
            li.classList.add('app__section-task-list-item-active');
        };            
    };
    return li;
};

btnAdicionarTarefa.addEventListener( 'click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
});

btnCancelarTarefa.addEventListener( 'click', () => {
    limpaEescondeForm ();
});

btnRemoverConcluidas.onclick = () => {
    const seletor = ".app__section-task-list-item-complete";
    document.querySelectorAll( seletor ).forEach( elemento => {
        elemento.remove();
        tarefas = tarefas.filter( tarefa => !tarefa.completa );
        atualizarLocalStorage();                
    })
};

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    // Cria um Objeto
    const tarefa = {
        descricao: textArea.value,
        completa: false
    };

    // Guarda o objeto no Array
    tarefas.push( tarefa );

    // Adiciona a nova tarefa na tela
    const elementoTarefa = criarElementoTarefa( tarefa );
    ulTarefas.append( elementoTarefa );

    // Guarda tarefa na LS
    atualizarLocalStorage();

    // Limpa o FORM e esconde
    limpaEescondeForm();
});

tarefas.forEach( tarefa => {
    const elementoTarefa = criarElementoTarefa( tarefa );
    ulTarefas.append( elementoTarefa );
});

/* 
document.addEventListener('DOMContentLoaded', function() {
    const tarefasSalvas = JSON.parse( localStorage.getItem('tarefas') ) || [];
    tarefasSalvas.forEach( tarefa => {
        const elementoTarefa = criarElementoTarefa( tarefa );
        ulTarefas.append( elementoTarefa );
    });
});
*/

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled','disabled');
        tarefaSelecionada.completa = true;
        atualizarLocalStorage();
    };
});


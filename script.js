const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const appTitle = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button'); // classe comum aos botoes
const startPauseBt = document.querySelector('#start-pause');
const comecarPausarBt = document.querySelector('#start-pause span');
const imgBotaoStartStop = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');
//const musicaFocoInput = document.querySelector("#alternar-musica");
// ou
const musicaFocoInput = document.getElementById("alternar-musica");
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if( musica.paused ) {
        musica.play();
    } else {
        musica.pause();
    }
})


// Adicionando um evento ao botao para mudar um atributo
focoBt.addEventListener( 'click', () => {
    tempoDecorridoEmSegundos = 1500;
    alteraContexto('foco');
    focoBt.classList.add('active');
});

// Adicionando um evento ao botao para mudar um atributo
curtoBt.addEventListener( 'click', () => {
    tempoDecorridoEmSegundos = 300;
    alteraContexto('descanso-curto');
    curtoBt.classList.add('active');
});

// Adicionando um evento ao botao para mudar um atributo
longoBt.addEventListener( 'click', () => {
    tempoDecorridoEmSegundos = 900;
    alteraContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alteraContexto( contexto ) {
    mostrarTempo();
    botoes.forEach( function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute( 'data-contexto', contexto );
    banner.setAttribute( 'src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            appTitle.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;            
            break;
        case "descanso-curto":
            appTitle.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `;            
            break;
        case "descanso-longo":
            appTitle.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;            
            break;            
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if( tempoDecorridoEmSegundos <= 0 ) {
        audioTempoFinalizado.play();
        alert('esgotou');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval( contagemRegressiva, 1000 );
    comecarPausarBt.textContent = 'Pausar';
    imgBotaoStartStop.setAttribute( 'src', "./imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    imgBotaoStartStop.setAttribute( 'src', "./imagens/play_arrow.png");
    comecarPausarBt.textContent = 'Começar';
    intervaloId = null;
    tempoDecorridoEmSegundos = 1500;
    return;
}

function mostrarTempo() {
    const tempo = new Date( tempoDecorridoEmSegundos * 1000 );
    const tempoFormatado = tempo.toLocaleTimeString( 'pt-Br', {minute: '2-digit', second: '2-digit'} );
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
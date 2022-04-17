// var pq tem escopo global ou de função, ja let e const tem escopo de bloco
// definição do tamanho da tela util do jogo
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10
var clearMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')
 
if (nivel === 'normal') {
    clearMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    clearMosquitoTempo = 1000
} else if (nivel === 'deuruim') {
    clearMosquitoTempo = 750
}


function ajustaTamanhoTelaJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    
    console.log(altura, largura)
}
ajustaTamanhoTelaJogo()

// a cada segundo passado, diminui um segundo do cronometro, até zerar
var cronometro = setInterval(function () {
    tempo -= 1
    
    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = "vitoria.html"
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }

}, 1000)

function posicaoRandom() {
    // remover o mosquito anterior (caso exista) para não acumular
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            window.location.href = "fim-de-jogo.html"
        } else {
            document.getElementById('v' + vidas).src = "img/coracao_vazio.png"
            vidas++
        }

    }

    // criação de posições randomicas baseada na função ajustaTamanhoTelaJogo()
    // o -90 é pra que não haja barra de rolagem sem estourar a tela
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //evitando que o mosquito desapareça da tela para não ter posição negativa
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //criar elemento html
    var mosquito = document.createElement('img') //criou a imagem de forma dinamica do mosquito
    mosquito.src = 'img/mosquito.png'
    mosquito.className = tamanhoRandom() + ' ' + ladoRandom()
    //definindo coordenadas 
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () {
        this.remove() //this faz referencia ao proprio elemento (mosquito)
    }

    document.body.appendChild(mosquito) //acessa o body e inclui essa imagem com a segunda 'classe'

}

//criacao e aplicação de tamanhos diferentes
function tamanhoRandom() {
    var classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

// colocar olhando pra esquerda ou direita
function ladoRandom() {
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'

    }
}
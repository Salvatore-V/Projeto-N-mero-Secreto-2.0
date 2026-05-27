let listaDeNumerosSorteados = [];
let limiteDeTentativas = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//função com parâmetro e sem retorno
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Digite um número entre 1 e 10');
}
    exibirMensagemInicial();



//função sem parâmetro e sem retorno
function verificarChute(){
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`
        exibirTextoNaTela('p',mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else {
        if (chute > numeroSecreto){
        exibirTextoNaTela('p','Número secreto é menor');
        }else{
        exibirTextoNaTela('p','Número secreto é maior')
        }
        tentativas++;
        limparCampo();
    }
}   

//função sem parâmetro mas com retorno
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * limiteDeTentativas + 1);
   let quantidaDeElementos = listaDeNumerosSorteados.length;

   if (quantidaDeElementos == limiteDeTentativas){
        listaDeNumerosSorteados = [];
   }
   //lista para que o mesmo número não seja sorteado novamente.
   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();  //verifica se o número já foi gerado e escolhe outro número como resposta
   }else{
    listaDeNumerosSorteados.push(numeroEscolhido);  //adiciona o número que ja foi sorteado na lista para não repetir
    console.log(listaDeNumerosSorteados)
    return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value ='';
}


function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

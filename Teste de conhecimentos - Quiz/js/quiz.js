// Código de execução do QUIZ

// Montagem das questões

var q1 = {pergunta : "Qual dessas medidas NÃO é cientificamente comprovada para o combate e prevenção da Covid-19?", 
            alternativa1 : "Usar álcool em gel", 
            alternativa2 : "Manter distânciamento social", 
            alternativa3 : "Tratamento com cloroquina", 
            alternativa4 : "Uso de máscara", 
            correta : "Tratamento com cloroquina", 
            explicacao : "O tratamento com cloroquina não é uma medida cientificamente comprovada para o combate e prevenção da Covid-19, todas as demais estão corretas."};

var q2 = {pergunta : "Os sintomas mais comuns da COVID-19 são:", 
            alternativa1 : "Perda de visão, tontura e pele amarelada", 
            alternativa2 : "Febre, tosse, cansaço, dor de cabeça e alteração do olfato", 
            alternativa3 : "Queda de cabelo, coceira na pele e falta de apetite", 
            alternativa4 : "Pele avermelhada, catarro e vista embaçada", 
            correta : "Febre, tosse, cansaço, dor de cabeça e alteração do olfato", 
            explicacao : "Os principais sintômas da Covid-19 são febre, tosse, cansaço, dor de cabeça e alteração do olfato."};

var q3 = {pergunta : "Estando em locais públicos, o mais indicado a se fazer ao espirrar ou tossir é?", 
            alternativa1 : "Cobrir com o cotovelo", 
            alternativa2 : "Cobrir com a mão", 
            alternativa3 : "Falar 'saúde'", 
            alternativa4 : "Utilizar máscara", 
            correta : "Utilizar máscara", 
            explicacao : "Fora de casa devemos utilizar máscara"};

let perguntas = [q1, q2, q3]; 

// Declaração das variáveis globais

let acertos = 0;
let erros = 0;
let questao = 0;
let campoAcertos = 0;
let campoErros = 0;
let p = "";
let a1 = "";
let a2 = "";
let a3 = "";
let a4 = "";
let resultado = "";
let jogo = "";
let lista = "";

// Função para a montagem da questão na tela

function montaQuestao(){

    jogo = document.querySelector(".jogo");

    p = jogo.querySelector("#pergunta");
    a1 = jogo.querySelector("#alternativa-1");
    a2 = jogo.querySelector("#alternativa-2");
    a3 = jogo.querySelector("#alternativa-3");
    a4 = jogo.querySelector("#alternativa-4");
    resultado = jogo.querySelector("#resultado");
    campoAcertos = jogo.querySelector("#acertos");
    campoErros = jogo.querySelector("#erros");

    p.textContent = perguntas[questao].pergunta; 
    a1.textContent = perguntas[questao].alternativa1;
    a2.textContent = perguntas[questao].alternativa2;
    a3.textContent = perguntas[questao].alternativa3;
    a4.textContent = perguntas[questao].alternativa4;    
    resultado.textContent = "Por favor, escolha uma das alternativas";

    lista = document.getElementById("lista-alternativas");
}

// Chamada da função para montar a primeira questão na tela

montaQuestao();

// Função de EVENTO para os botões de ALTERNATIVA

lista.addEventListener("click", function(event){

    // não deixar clicar em outra alternativa até clicar em próxima
    if(!algumaAlternativaEscolhida()){

        var escolha = event.target.id;
        var botaoEscolhido = document.getElementById(escolha);
        var textoEscolha = botaoEscolhido.textContent;        
        var correta = perguntas[questao].correta;
        var mensagem = "";
            
        if(textoEscolha == correta){        
            botaoEscolhido.classList.replace("botao-alternativa", "resposta-correta");
            console.log("acertou!");
            acertos = acertos + 1;        
            mensagem = "Parabéns, você acertou: ";
            
        }else{        
            console.log("Errou.")
            erros = erros + 1;        
            mensagem = "Infelizmente você errou: ";
            botaoEscolhido.classList.replace("botao-alternativa", "resposta-errada");

            // selecionar o botão com a alternativa correta para colorir de verde            
            var todos = lista.querySelectorAll("p");
            todos.forEach(function(b){            
                if(b.textContent == correta){
                    b.classList.replace("botao-alternativa","resposta-correta");
                }
            });

        }

        // contabiliza acertos e erros
        campoAcertos.textContent = acertos;
        campoErros.textContent = erros;

        // mostra a mensagem de explicação associada à pergunta
        resultado.textContent = mensagem + perguntas[questao].explicacao;        
        
        // vai para a próxima questão
        questao = questao + 1;      
}  

})

// Função de EVENTO para o botão de PRÓXIMA

let botao = document.querySelector("#proxima");

botao.addEventListener("click",function(){

    if(algumaAlternativaEscolhida()){

        limpaClasses();

        if(questao < perguntas.length){
            montaQuestao();
        }else{
            fimDeJogo();
        }
    }else{
        alert("Por favor, escolha uma alternativa.");
    }  

})

// Verificar se alguma alternativa foi escolhida

function algumaAlternativaEscolhida(){
    
    var escolhido = false;
    var botoes = lista.querySelectorAll("p");    
    botoes.forEach(function(b){        
        if(b.classList.toString() != "botao-alternativa"){
            escolhido = true;
        }        
    })
    return escolhido;
}

// Limpar as classes dos botões de alternativas

function limpaClasses(){
    var botoes = lista.querySelectorAll("p");    
    botoes.forEach(function(b){        
        b.classList.replace(b.classList.toString(), "botao-alternativa");
    })
}

// Função que finaliza o jogo mostrando os resultados

function fimDeJogo(){

    let mensagemFim = "Você acertou " + acertos + " pergunta(s): ";

    var mensagensFim = ["Você sabe pouco sobre a prevenção. Que tal dar uma olha neste site 'https://portal.fiocruz.br/coronavirus/perguntas-e-respostas' ?",
    "Você está ficando bom, que tal ler esse artigo (https://portal.fiocruz.br/coronavirus/perguntas-e-respostas) para melhorar seu conhecimento sobre Covid-19?",
    "Você sabe bastante sobre prevenção, esperamos que as dicas durante o jogo, tenham melhorado ainda mais seu conhecimento sobre prevenção da Covid-19",
    "Parabéns, você está sabe como se prevenir, ajude a conscientizar outras pessoas."]

    mensagemFim = mensagemFim + mensagensFim[acertos];
    
    /*
    switch(acertos){
        case 0 : mensagemFim = mensagemFim + "Você sabe pouco sobre a prevenção. Que tal dar uma olha neste site https://portal.fiocruz.br/coronavirus/perguntas-e-respostas ?";
        break;
        case 1 : mensagemFim = mensagemFim + "Você está ficando bom, que tal ler esse artigo (link) para melhorar seu conhecimento sobre Covid-19?";
        break;
        case 2 : mensagemFim = mensagemFim + "Você sabe bastante sobre prevenção, esperamos que as dicas durante o jogo, tenham melhorado ainda mais seu conhecimento sobre prevenção da Covid-19";
        break;
        case 3 : mensagemFim = mensagemFim + "Parabéns, você está sabe como se prevenir, ajude a conscientizar outras pessoas.";
        break;
    }*/

        resultado.textContent = mensagemFim;
}

// FIM DO CÓDIGO
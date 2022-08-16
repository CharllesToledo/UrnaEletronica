let seuVotoPara = document.querySelector('.d-1-1 span'); //Mostra a frase "Seu voto para"
let cargo = document.querySelector('.d-1-2 span'); //Cargo Vereador ou prefeito
let descricao = document.querySelector('.d-1-4'); //descrição dos candidatos
let aviso = document.querySelector('.d-2'); //aviso no rodapé da urna
let lateral = document.querySelector('.d-1-right'); //foto dos canditados
let numeros = document.querySelector('.d-1-3'); //Onde serão digitados os numeros

let etapaAtual = 0; 
let numero = '';
let votoBranco = false;
let votos = [];

//Da início a votação, limpando toda a tela e mantendo o foco apenas no voto. 
function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

//Verifica quantos numeros são precisos para votar em cada etapa, esse numero esta especificado no "etapas.js" .
    for(let i=0; i<etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo; //etapa.titulo vem do arquivo etapas.js VEREADOR / PREFEITO;
    descricao.innerHTML = '';   
    aviso.style.display = 'none';
    lateral.innerHTML = ' ';
    numeros.innerHTML = numeroHtml; //vai mostrar quantos quadradinho a serem preenchidos, de acordo com a etapa. 
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
//Esse filter vai criar um novo array com as informações do candidato em que o numero coincidiu. 
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
//Se o array candidato nao for vazio, preencha tais informações.
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        if(etapaAtual === 1){ //SE estiver na etapa prefeito mostre o nome do prefeito e vice. Se não mostre apenas o do vereador.
            descricao.innerHTML = `Nome: ${candidato.nome} & ${candidato.vice}<br/>Partido: ${candidato.partido}`;
        } else {descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`};

        
        let fotosHtml = '';
        for(let i in candidato.fotos) {
          if(candidato.fotos[i].small) {
            fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`; //Com o uso do small a foto vai ficar um pouco menor, sendo do vice prefeito. 
          } else {
              fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`; 
          }
            
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

//Botões branco, corrige e confirma. 
function branco() {
  if(numero ===''){
    votoBranco = true;   
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'; //Exibe voto em branco na tela.
  }
}

function corrige() {
    comecarEtapa(); //Começa a etapa novamente. 
}

function confirma() {
    let audio = document.querySelector('.audioConfirma'); //Audio da urna.
    let etapa = etapas[etapaAtual];
  
    let votoConfirmado = false; 
    if(votoBranco === true) {   
      votoConfirmado = true;
      votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: 'branco'
      });
    } else if (numero.length === etapa.numeros) {
      votoConfirmado = true;
      votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: numero
      });
    }
  
    if(votoConfirmado){
      etapaAtual++; 
      if(etapas[etapaAtual] !== undefined) {
        audio.currentTime = 6.175;  
        audio.play();  
        comecarEtapa();
      } else {
        audio.currentTime = 5.25;  
        audio.play();  
        document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        console.log(votos);
      }
    }
}

comecarEtapa();
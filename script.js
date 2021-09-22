let d_1_1_span = document.querySelector('.d-1-1 span');// Seu voto para
let d_1_2_span = document.querySelector('.d-1-2 span');// Cargo
let d_1_4 = document.querySelector('.d-1-4');// descrição
let d_2 = document.querySelector('.d-2');// Instruções
let d_1_right = document.querySelector('.d-1-right');// espaço lateral da imagem dos candidatos
let d_1_3 = document.querySelector('.d-1-3');// area dos números dos candidatos

let currentStage = 0;
let number = '';
let voteWhite = false;
let votes = [];

function showStage() {
    let stage = phases[currentStage];

    let d_1_3_Numbers = '';
    number = '';
    voteWhite = false;

    for(let i=0; i<stage.numbers;i++){
        if(i === 0) {
            d_1_3_Numbers = '<div class="number blink"></div>';
        }else{
            d_1_3_Numbers += '<div class="number"></div>';
        }
    }

    d_1_1_span.style.display = 'none'; //seu voto
    d_1_2_span.innerHTML = stage.title; //cargo
    d_1_4.innerHTML = ''; //descrição
    d_2.style.display = 'none'; //instruções
    d_1_right.innerHTML = ''; //espaço lateral da imagem dos candidatos
    d_1_3.innerHTML = d_1_3_Numbers; //Número dos candidatos

}

function updateScreen(){
    let stage = phases[currentStage];
    let candidate = stage.candidates.filter((item)=>{
        if(item.number === number) {
            return true;
        }else {
            return false
        }
    });
    if(candidate.length > 0) {
        candidate = candidate[0];
        d_1_1_span.style.display = 'block';
        d_2.style.display = 'block';
        d_1_4.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}<br/>`;
       
        let photosHTML = '';
        for(let i in candidate.photos) {
            if(candidate.photos[i].small){
                photosHTML += `<div class="d-1-image small"><img src="images/${candidate.photos[i].url}" alt="" />${candidate.photos[i].subtitle}</div>`
            } else {
                photosHTML += `<div class="d-1-image"><img src="images/${candidate.photos[i].url}" alt="" />${candidate.photos[i].subtitle}</div>`
            }         
        }

        d_1_right.innerHTML = photosHTML;
    }else {
        d_1_1_span.style.display = 'block';
        d_2.style.display = 'block';
        d_1_4.innerHTML = '<div class ="big--warning blink">VOTO NULO</div>'
    }

}


function clicked(n) {
    let elementNumber = document.querySelector('.number.blink');
    if(elementNumber !== null) {
        elementNumber.innerHTML = n;
        number = `${number}${n}`;

        elementNumber.classList.remove('blink');
        if(elementNumber.nextElementSibling !== null){
            elementNumber.nextElementSibling.classList.add('blink');
        }else {
            updateScreen();
        }
    }
}
function white() {
    if(number === '') {
        voteWhite = true;
        d_1_1_span.style.display = 'block';
        d_2.style.display = 'block';
        d_1_3.innerHTML = '';
        d_1_4.innerHTML = '<div class ="big--warning blink">VOTO EM BRANCO</div>';
    }
}
function correct() {
    showStage();
}
function confirm() {
    let stage = phases[currentStage];
    
    let confirmVote = false;

   if(voteWhite === true){
    confirmVote = true;
    votes.push({
        stage: phases[currentStage].title,
        vote: 'White'
    });
   }else if(number.length === stage.numbers) {
    confirmVote = true;
    votes.push({
        stage: phases[currentStage].title,
        vote: number
    });
   }
   if(confirmVote){
    currentStage++;
    if(phases[currentStage] !== undefined) {
        showStage();
    }else {
        document.querySelector('.screen').innerHTML = '<div class ="bigger--warning blink">FIM!</div>';
        console.log(votes)
    }
   }
}

showStage();
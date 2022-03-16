'use strict'

console.log('Приветствую!\n Здесь просто чёрт ногу сломит :D но вроде всё работает на удивление\n Спасибо за уделённое время!');
const cards = document.querySelectorAll('.card');
let stepsBlock = document.querySelector('.steps');
let foundArray = [];
let rating = '';
let changedCard = false;
let first, second;
let closePlayingFild = false;
let step = 0;
let nickName = '';
let player = {};
let counterUseOfGame = 0;
let scoreArr = [];



const changeCard = (event) => {
    if (closePlayingFild) {
        return;
    }
    let target = event.target.parentElement;

    if (target === first) {
        return;
    }

    target.classList.toggle('open');
    
    if (!changedCard) {
        changedCard = true;
        first = target;
        
    } else {
        changedCard = false;
        second = target;
        checkImg();
    }
    
}

const checkImg = () => {
    if (first.dataset.hero === second.dataset.hero) {
        first.removeEventListener('click', changeCard)
        second.removeEventListener('click', changeCard)
        first.style.border = '2px solid green';
        second.style.border = '2px solid green';
        foundArray.push(first.dataset.hero);
        
        
    } else {
        closePlayingFild =  true;
        setTimeout(() => {
            first.classList.remove('open')
            second.classList.remove('open')
            reset();
        }, 1000)
    }
    showSteps();
    isEndGame();
}

function reset() {
    changedCard = closePlayingFild = false;
    first = second = null;
}

function showSteps() {
    step += 1;
    stepsBlock.innerHTML = `Step = ${step}`;
}

function saveNickAndCreateScore() {
    document.querySelector('.enter').addEventListener('click', () => {
        nickName = document.querySelector('.input').value;
        createObj(nickName, step)
        document.body.innerHTML = 
        `<div class ="end-game">
            <h2>Score:</h2>
            <ol class="score-list">
             
            </ol>
            <button class="btn" type="button">Try again</button>
        </div>`;

        addInStorage();
        getScoreList();
        document.querySelector('.btn').addEventListener('click', () => location.reload())
    })
}


function isEndGame() {
    if (foundArray.length === 6) {
        document.body.innerHTML = 
        `<div class ="end-game">
            <p>GAME OVER</p>
            <p>Your rating is "${checkRating(step)}"</p>
            <p>Steps = ${step}</p>
            <input type="text" class="input" autofocus placeholder="Enter your Nickname to save your result">
            <button class="enter" type="button">Save</button>
        </div>`;

        counterUseOfGame++;
        saveNickAndCreateScore();

        
        
    } 
}

function getLocalStorage() {

}

function checkRating(value) {
    if (value > 5 && value < 8) {
        return 'Miracle';
    } else if (value > 7 && value < 10) {
        return 'Carry from free line';
    } else if (value > 9 && value < 12) {
        return 'Pudge with MoM';
    } else {
        return 'Creep';
    }
}



cards.forEach((elem) => {
    elem.addEventListener('click', changeCard);
    let random = Math.floor(Math.random() * cards.length);
    elem.style.order = random;
})


function addInStorage() {
    if (localStorage.getItem('players') === null) {
        localStorage.setItem(`players`, JSON.stringify(scoreArr));
        getData();
    } else {
        getData();

    }
}

function getData() {
    let data = localStorage.getItem('players')
    data = JSON.parse(data);
    data.push(player);
    localStorage.setItem('players', JSON.stringify(data));

}

function createObj(value, step) {
    player.name = value;
    player.steps = step;
}

function getScoreList() {
    let sl = document.querySelector('.score-list')
    let scoreList = localStorage.getItem('players');
    scoreList = JSON.parse(scoreList);
    scoreList.sort((a, b) => a.steps - b.steps)
    scoreList.forEach((elem) => sl.innerHTML += 
    `<li>${elem.name}..............................${elem.steps}</li><br>`);

}



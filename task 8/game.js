let pictures = [];
let clicks = 0
let imagesPairs = [];
let guessedCount = 0;

for (let i = 0; i < 12; i++) {
    pictures[i] = `url("./images/${i % 6 + 1}.png")`;
}


console.log(pictures);
shuffle();
renderPictures();


//Перемешиваем элементы массива
function shuffle() {
    for (let i = 0; i < pictures.length; i++) {
        const randomIndex = Math.floor(Math.random() * 10);
        const initialValue = pictures[i];
        pictures[i] = pictures[randomIndex];
        pictures[randomIndex] = initialValue;
    }
}

function renderPictures() {
    const cardsBlocks = document.getElementsByClassName('flipper');
    for(let i = 0; i < 12; i++) {
        cardsBlocks[i].children[0].style.background = pictures[i];
    }
   }

function onClick (event) {                         
   const cardsBlocks = document.getElementsByClassName('flipper')
    clicks++;
                          
    if (imagesPairs[clicks - 1]) {
        cardsBlocks[imagesPairs[clicks - 1].id].style.transform = "rotateY(0deg)"; 
    }
    imagesPairs[clicks - 1] = event.target.closest('.flipper') || event.target.querySelector('.flipper');
    cardsBlocks[imagesPairs[clicks - 1].id].style.transform = "rotateY(180deg)"; 
    if (clicks === 2) {
         setTimeout(() => {
            if (imagesPairs[0].children[0].style.background === imagesPairs[1].children[0].style.background && imagesPairs[0].id !== imagesPairs[1].id) {
            cardsBlocks[imagesPairs[0].id].style.visibility = "hidden";
            cardsBlocks[imagesPairs[1].id].style.visibility = "hidden";
                guessedCount++;
                if(guessedCount >= 6){
                    const greeting = document.createElement('h1');
                    greeting.innerText = "You win!";
                    document.querySelector('main').insertBefore(greeting, document.querySelector('.cardsBlock'));
                }
            } else {
                 cardsBlocks[imagesPairs[0].id].style.transform = "rotateY(0deg)"; 
                 cardsBlocks[imagesPairs[1].id].style.transform = "rotateY(0deg)"; 
            }
            imagesPairs = [];
        }, 800)
        clicks = 0;
    }
}


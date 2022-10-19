const quotes = [
    'Look into my eye!',
    'We are on an express elevator to hell going down.',
    'They cut the power.',
    'I say we take off, nuke the site from orbit. It is the only way to be sure.',
    'Nuke it from orbit, it is the only way to be sure.',
    'We had better get back because it will be dark soon and they mostly come at night. Mostly.',
]

const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');
const message = document.getElementById('message');

let targetWord;

let wordQueue;
let highlightPosition;
let startTime;

function initializeGame() {
    quote.innerHTML = '';
    message.innerHTML = '';
}

function startGame() {
    console.log("Game started!");
    initializeGame();
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quoteText = quotes[quoteIndex];

    wordQueue = quoteText.split(' ');
    quote.innerHTML = wordQueue.map(word => (`<span>${word}</span>`)).join('');
//    targetWord = "typeme";
//    quote.innerHTML = `<span>${targetWord}</span>`;
    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = 'highlight';

    startTime = new Date().getTime();

    document.body.className = "";
    start.className = "started";
    setTimeout(() => { start.className = "button"; }, 2000);
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput);

function checkInput() {
    console.log("Checking", input.value);
    const currentWord = wordQueue[0].replaceAll(".", "").replaceAll(",", "");
    const typedValue = input.value.trim();

    if (currentWord !== typedValue) {
        input.className = currentWord.startsWith(typedValue) ? "" : "error";
        return;
    }

    wordQueue.shift(); // shift removes first item (0th element)
    input.value = ""; // empty textbox

    quote.childNodes[highlightPosition].className = ""; //unhighlight word

    if (wordQueue.length === 0) { //if we have run out of words, game over
        gameOver();
        return;
    }

    highlightPosition++;
    quote.childNodes[highlightPosition].className = 'highlight';
 
}

function gameOver() {
    const elapsedTime = new Date().getTime() - startTime;
    document.body.className = "winner";
    message.innerHTML = `
    <span class="congrats">Congratulations!</span><br>
    You finished in ${elapsedTime / 1000} seconds.
    `;
}


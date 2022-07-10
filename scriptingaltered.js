const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
let rateEL = document.getElementById("rateEL") 
let count = 60
let counted = 0
let show=0
quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) {
    countWord()
    renderNewQuote()
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
}

let showEL = document.getElementById("show")

let countEL = document.getElementById("timer")


countEL.innerText = count
function startTimer() {
  if (count>-1){
  countEL.innerText = count--
  setTimeout(startTimer, 1000)
  } else {
  countWord()

  counted=0;
  quoteInputElement.value = null;
  count=60
  }
}
// var counted=0;
// var ID=0;
// var seconds=60;

// function printMSG(){
//   if(seconds>0){
//     document.getElementsById("timer").innerHTML=seconds;
//     seconds--;

//   } else {
//     stopTimer();
//     // Display it as output
//     document.getElementById("show").innerHTML= counted;
//     counted=0;
//     quoteInputElement.value = null;
//   }
// }

// function startTimer(){
//   ID=window.setInterval(printMSG, 1000);
// }

// function stopTimer(){
//   window.clearInterval(ID)
// }

function countWord() {
 
            // Get the input text value
  var words = document.getElementById("quoteInput").value;
 
            // Initialize the word counter
  var amount = 0;
 
            // Split the words on each
            // space character
  var split = words.split(' ');
 
            // Loop through the words and
            // increase the counter when
            // each split word is not empty
  for (var i = 0; i < split.length; i++) {
    if (split[i] != "") {
      amount += 1;
    }
  }
 
            // Display it as output
  counted+=amount;
  document.getElementById("show").innerHTML = counted;
  
}

renderNewQuote()
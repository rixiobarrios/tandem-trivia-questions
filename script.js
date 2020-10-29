// target start button in the Document Object Model(DOM)
const startButton = document.getElementById('start-btn')
// target question buttons in the Document Object Model(DOM)
const questionContainerElement = document.getElementById('question-container')
// shuffle variable and question index variable
const shuffled, currentIndex
currentIndex = 0;
startButton.addEventListener('click', start)

function start() {
    console.log('you clicked on start')
    startButton.classList.add('hide') // hides button after pressing start
    shuffled = questions.sort(() => Math.random() - .5) // arrow function to shuffle the questions
    questionContainerElement.classList.remove('hide') // shows questions after start button is pressed
    next() // sets next question
}

function next() {

}

function select() {

}

const questions = [
    {
      question: "What is your favorite color?", // test question
      answers: [
          {text: 'black', correct: true},
          {text: 'white', correct: false}
      ]  
    }
]
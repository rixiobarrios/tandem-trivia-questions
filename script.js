// target start button in the Document Object Model(DOM)
const startButton = document.getElementById('start-btn')
// target next button in the Document Object Model(DOM)
const nextButton = document.getElementById('next-btn')
// target question buttons in the Document Object Model(DOM)
const questionContainerElement = document.getElementById('question-container')
// target question in the Document Object Model(DOM)
const questionElement = document.getElementById('question')
// target answer buttons in the Document Object Model(DOM)
const answerButtonsElement = document.getElementById('answer-buttons')
// shuffle variable and question index variable
let shuffledQuestions, currentQuestionIndex
// event listener for start button
startButton.addEventListener('click', start)

function start() {
    console.log('you clicked on start')
    startButton.classList.add('hide') // hides button after pressing start
    shuffledQuestions = questions.sort(() => Math.random() - .5) // arrow function to shuffle the questions
    currentQuestionIndex = 0; // stars question's array from index 0
    questionContainerElement.classList.remove('hide') // shows questions after start button is pressed
    nextQuestion() // sets next question
}

function nextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => { // loop through answers array
        const button = document.createElement('button') // create element
        button.innerText = answer.text
        button.classList.add('btn') // target button class
        if(answer.correct) { // conditional statement for logic
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer) // event listener for correct answer
        answerButtonsElement.appendChild(button) // adding answers/creating buttons
    })
}

function resetState() {
    nextButton.classList.add('hide') // hide next button
    while (answerButtonsElement.firstChild) { // loop through all children
       answerButtonsElement.removeChild
       (answerButtonsElement.firstChild)         
    }
}

function selectAnswer(e) {
    const selectedButton = e.target // target selected button
    const correct = selectedButton.dataset.correct
    Array.from(answerButtonsElement.children)
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
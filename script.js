
// target welcome message in the Document Object Model(DOM)
const welcomeElement = document.getElementById('welcome')

// target start button in the Document Object Model(DOM)
const startButton = document.getElementById('start-btn');

// target next button in the Document Object Model(DOM)
const nextButton = document.getElementById('next-btn');

// target question buttons in the Document Object Model(DOM)
const questionContainerElement = document.getElementById('question-container');

// target question in the Document Object Model(DOM)
const questionElement = document.getElementById('question');

// target answer buttons in the Document Object Model(DOM)
const answerButtonsElement = document.getElementById('answer-buttons');

// shuffle variable and question index variable
let shuffledQuestions, currentQuestionIndex;

// event listener for start button
startButton.addEventListener('click', startGame);

// initial score for player
let playerScore = 0;

// reset score
function resetScore() {
    let playerScore = 0
    document.getElementById('player-score').innerText = playerScore;
}

// event listener for next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++; // increment currentQuestionIndex to move to the next question
    nextQuestion();
});

//create an empty array for loadedQuestions copy
let questions = [];
// let correctAnswers = [];

// fetch application data
fetch('Apprentice_TandemFor400_Data.json')
    .then((res) => res.json())
    .then((loadedQuestions) => {
        questions = [...loadedQuestions]; // create copy here using spread operator
        correctAnswers = [questions.correct]
        newQuestions = questions.concat(correctAnswers);
        console.log('Questions loaded!', questions[1].incorrect);
        console.log('All questions loaded', newQuestions)
        console.log('Correct answer loaded!', questions[1].correct)
    })
    .catch((err) => console.dir(err)); // error catching



function startGame() {
    startButton.classList.add('hide'); // hides button after pressing start
    welcomeElement.classList.add('hide'); // hides welcome message after pressing start
    shuffledQuestions = newQuestions.sort(() => Math.random() - 0.5); // arrow function to shuffle questions
    currentQuestionIndex = 0; // stars question's array from index 0
    questionContainerElement.classList.remove('hide'); // shows questions after start button is pressed
    nextQuestion(); // sets next question
}

// move to next question
function nextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question; // show question
    // loop through answers array
    question.incorrect.forEach((answer) => {
        const button = document.createElement('button'); // create element/buttons for choices
        button.innerText = answer;
        button.classList.add('btn'); // target button class to add
        if (answer.incorrect) {
            // conditional statement for logic
            button.dataset.incorrect = answer.incorrect;
        }
        button.addEventListener('click', selectAnswer); // event listener for answer
        answerButtonsElement.appendChild(button); // adding answers/creating buttons in DOM
        
    });
}

// next will show correct answer and add colors to the buttons as they are selected
// limit questions to 10 at a time

function resetState() {
    nextButton.classList.add('hide'); // hide next button
    while (answerButtonsElement.firstChild) {
        // loop through all children
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// selected answer actions
function selectAnswer(e) {
    const selectedButton = e.target; // target selected button
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        // convert into an array to be able to use forEach
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

// set question status
function setStatusClass(element, correct) {
    // feedback from answer chosen
    clearStatusClass(element); // clear previous status
    if (correct) {
        // conditional for correct and incorrect answers for DOM
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

// clear question status
function clearStatusClass(element) {
    // remove classes after answer was given
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}


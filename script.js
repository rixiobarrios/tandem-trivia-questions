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
// event listener for next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++; // increment currentQuestionIndex to move to the next question
    nextQuestion();
});

//create an empty array for loadedQuestions copy
let questions = [];

// fetch application data
fetch('Apprentice_TandemFor400_Data.json')
    .then((res) => res.json())
    .then((loadedQuestions) => {
        questions = [...loadedQuestions]; // create copy here
        console.log('Questions loaded!', questions[0].incorrect);
    })
    .catch((err) => console.dir(err)); // error catching

function startGame() {
    startButton.classList.add('hide'); // hides button after pressing start
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // arrow function to shuffle questions
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
    questionElement.innerText = question.question;
    question.incorrect.forEach((answer) => {
        // loop through answers array
        const button = document.createElement('button'); // create element
        button.innerText = answer;
        button.classList.add('btn'); // target button class
        if (answer.correct) {
            // conditional statement for logic
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer); // event listener for correct answer
        answerButtonsElement.appendChild(button); // adding answers/creating buttons
    });
}

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
        element.classList.add('wrong');
    }
}

// clear question status
function clearStatusClass(element) {
    // remove classes after answer was given
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// const questions = [
//     {
//       question: "What is your favorite color?", // test question
//       answers: [
//           {text: 'black', correct: true},
//           {text: 'white', correct: false}
//       ]
//     }
// ]

// test to fetch json data
// const questions = 'Apprentice_TandemFor400_Data.json';
// async function getData() {
//     const response = await fetch(questions);
//     const data = await response.json();
//     console.log(data);
// }
// getData();

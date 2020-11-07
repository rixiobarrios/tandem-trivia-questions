// target welcome message in the Document Object Model(DOM)
const welcomeElement = document.getElementById('welcome');

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

// target player score in the Document Object Model(DOM)
const playerScoreElement = document.getElementById('player-score');

// target score container in the Document Object Model(DOM)
const scoreContainerELement = document.querySelector('.score-container');

// shuffle variable and question index variable
let shuffledQuestions, currentQuestionIndex;

// event listener for start button
startButton.addEventListener('click', startGame);

// event listener for next button
nextButton.addEventListener('click', nextQuestion);

// initial score for player
let playerScore = 0;

// number of questions per trivia
const numberOfQuestions = 10;

//create an empty array for loadedQuestions copy
let questions = [];

// reset score
function resetScore() {
    playerScore = 0;
    playerScoreElement.innerText = playerScore;
}

// increment score
function incrementScore() {
    playerScore++;
    playerScoreElement.innerText = `${playerScore}/${shuffledQuestions.length}`;
}

// fetch application data
fetch('Apprentice_TandemFor400_Data.json')
    .then((res) => res.json())
    .then((loadedQuestions) => {
        questions = [...loadedQuestions].filter(
            (ques, i) => i < numberOfQuestions
        ); // create copy here using spread operator
    })
    .catch((err) => console.dir(err)); // error catching

// start game
function startGame() {
    startButton.classList.add('hide'); // hides button after pressing start
    welcomeElement.classList.add('hide'); // hides welcome message after pressing start
    shuffledQuestions = questions.sort(() => Math.random() - 0.5); // arrow function to shuffle questions
    currentQuestionIndex = 0; // stars question's array from index 0
    scoreContainerELement.classList.add('hide'); // hide score when starting game
    questionContainerElement.classList.remove('hide'); // shows questions after start button is pressed
    resetState();
    resetScore();
    showQuestion(shuffledQuestions[currentQuestionIndex]); // sets next question
}

// move to next question
function nextQuestion() {
    currentQuestionIndex++;
    resetState();
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (currentQuestion) {
        showQuestion(currentQuestion);
    } else {
        endGame();
    }
}

function showQuestion(question) {
    questionElement.innerText = question.question; // show question
    // loop through answers array
    const allAnswers = shuffleArray([...question.incorrect, question.correct]); // returns all answers shuffled
    allAnswers.forEach((answer) => {
        const isCorrect = question.correct === answer; // whether the answer is correct or not
        const button = document.createElement('button'); // create element/buttons for choices
        button.innerText = answer; // append answer string to button
        button.classList.add('answer-btn'); // target answer-button class to add
        button.classList.add('btn'); // target button class to add

        button.dataset.correct = isCorrect; // track answer correctness in button

        if (isCorrect) {
            button.classList.add('correct-btn'); // add correct class to button (for styling)
        }

        button.addEventListener('click', selectAnswer); // event listener for answer
        answerButtonsElement.appendChild(button); // adding answers/creating buttons in DOM
    });
}

function resetState() {
    nextButton.classList.add('hide'); // hide next button
    while (answerButtonsElement.firstChild) {
        // loop through all children
        answerButtonsElement.removeChild(answerButtonsElement.firstChild); // remove each answer
    }
}

// selected answer actions
function selectAnswer(e) {
    const answerBtns = document.querySelectorAll('.answer-btn'); // target all answer buttons
    answerBtns.forEach((answerBtn) => {
        // disable each answer buttons
        answerBtn.removeEventListener('click', selectAnswer);
        answerBtn.disabled = true;
    });

    const selectedButton = e.target; // target selected button
    selectedButton.classList.add('selected-btn'); // add selected class to button (for styling)

    const correct = selectedButton.dataset.correct === 'true';

    if (correct) {
        // increment score
        incrementScore();
    }

    nextButton.classList.remove('hide');
}

// clear question status
function clearStatusClass(element) {
    // remove classes after answer was given
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

// returns given array shuffled
function shuffleArray(arr) {
    let shuffledArr = arr;
    for (let i = 0; i < shuffledArr.length; i++) {
        const randomIndex = Math.floor(Math.random() * shuffledArr.length); // gets random index in array
        const randomValue = shuffledArr[randomIndex]; // gets value in the random index
        shuffledArr[randomIndex] = shuffledArr[i]; // value in random index changed to current value in iteration
        shuffledArr[i] = randomValue; // current index changed to the random value in array
    }
    return shuffledArr;
}

// end game
function endGame() {
    questionContainerElement.classList.add('hide'); // hide question and answers
    scoreContainerELement.classList.remove('hide'); // unhide score
    startButton.innerText = 'Restart'; // shows start button as Restart
    startButton.classList.remove('hide'); // unhide restart button
}

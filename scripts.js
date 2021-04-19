var quizContainer = document.getElementById('quiz');
var formContainer = document.getElementById("myForm");
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var startButton = document.getElementById('start-btn');
var scoreEl = document.getElementById("score");
var timerEl = document.getElementById("timer");

score = 0
scoreEl.textContent = score
var timeLeft = 30;

// Arrays have a specific order that they are listed in
var myQuestions = [
    {question: "Why is the animal performing the behaviour?",answers: { "A": "Development", "B":"Causation" , "C":"Evolution" , "D":"Function"},correctAnswer: "D"},
    {question: "How did the behaviour evolve?",answers: { "A": "Development", "B":"Causation" , "C":"Evolution" , "D":"Function"},correctAnswer: "C"},
    {question: "What causes the behaviour to be performed?",answers: { "A": "Development", "B":"Causation" , "C":"Evolution" , "D":"Function"},correctAnswer: "B"},
    {question: "How has the behaviour developed during the lifetime of the individual?",answers: { "A": "Development", "B":"Causation" , "C":"Evolution" , "D":"Function"},correctAnswer: "A"},
    {question: "In which way does the behaviour increase the animal’s fitness (i.e. its survival and reproduction)?",answers: { "A": "Development", "B":"Causation" , "C":"Evolution" , "D":"Function"},correctAnswer: "D"}
];

// Timer that counts down from whatever value we would like to establish
function countDown() {
    console.log("Running countdown")
  
    var timeInterval = setInterval(function () {
      if (timeLeft > 0) {
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEl.textContent = ''; // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        clearInterval(timeInterval); // Use `clearInterval()` to stop the timer
        endGame();
      }
    }, 1000);
}
function addPoint() {
    console.log("adding a point to score");
    score ++;
    scoreEl.textContent = score;
}
function subtractTime() {
    console.log("taking a point from time");
    timeLeft --;
    timerEl.textContent = timeLeft;
}


function makeQuestion(QuestionString) {
    var pElement = document.createElement("p"); // Created a paragraph element
    pElement.setAttribute("id", "question"); // Gave paragraph id of question
    pElement.innerHTML = QuestionString; // Placed question inside of paragraph html
    formContainer.appendChild(pElement); // Append the paragraph element to the quiz class
}
function makeRadioButton(position,answers) {

    // Create the radio button and label
    var radio1 = document.createElement("input");
    var label1 = document.createElement("label");
    radio1.setAttribute("type","radio");
    radio1.setAttribute("name","answers");
    radio1.setAttribute("value",position)

    label1.setAttribute("for","answers")
    label1.innerText = position + ") " + answers
    
    formContainer.appendChild(radio1);
    formContainer.appendChild(label1);

    var linebreak = document.createElement("br"); // Created a paragraph element
    formContainer.appendChild(linebreak); // Append the paragraph element to the quiz class
}
function addComparisonButtons(correctLetter) {

    console.log("making submit comparison")
    var submitButton = document.createElement("button"); // Create a button element for submitting answers
    submitButton.setAttribute("id", "submit"); // Give button id of submit
    submitButton.innerHTML = "Submit Answer"; // Give button a string value
    formContainer.appendChild(submitButton); // Append the paragraph element to the quiz class


    formContainer.addEventListener( "submit", function(event){
        var data = new FormData(formContainer); // Creates an object with the data input from form tag
        var output = ""; // Creates an empty string which we can add our response to EX: [answers,position]
        
        for (const entry of data) { // for the entry of data into our form create an array of the attributes name (answers) and the value (whtever we specify in input radio element EX position)
          output = output + entry[1];
        };
  
        choseCorrectly = output==correctLetter;
        giveBoolComparison();

        event.preventDefault();

        
        }


    );

    function giveBoolComparison() {
        console.log("Comparing values");
        if (choseCorrectly) {
            console.log("right choice")
            addPoint();
        } else {
            console.log("wrong choice");
            subtractTime();
        }
    
    
    }


}

function buildQuiz(params) {
    console.log("Building quiz.");

    questionArray = Object.values(myQuestions[Math.floor(Math.random()*myQuestions.length)]);   // Random array of my questions
    question = questionArray[0];   // The random question 
    possibleAnswers = questionArray[1];   // Object with the possible answers retrieved with a .keymethod
    correctAnswer = questionArray[2];   // Used to compare chosen radio answer with correct answer
    keys = Object.keys(possibleAnswers) // Keys of the of the possible answers (A,B,C,D)

    // Paragraph Question Element
    makeQuestion(question);

    // Radio buttons 
    makeRadioButton(keys[0],possibleAnswers.A); 
    makeRadioButton(keys[1],possibleAnswers.B);
    makeRadioButton(keys[2],possibleAnswers.C);
    makeRadioButton(keys[3],possibleAnswers.D);

    // Compare and add point or remove time
    addComparisonButtons(correctAnswer);
    
}

function modifyQuiz(params) {
    console.log("Modifying quiz.");

    questionArray = Object.values(myQuestions[Math.floor(Math.random()*myQuestions.length)]);   // Random array of my questions
    question = questionArray[0];   // The random question 
    possibleAnswers = questionArray[1];   // Object with the possible answers retrieved with a .keymethod
    correctAnswer = questionArray[2];   // Used to compare chosen radio answer with correct answer
    keys = Object.keys(possibleAnswers) // Keys of the of the possible answers (A,B,C,D)

    // Paragraph Question Element
    makeQuestion(question);

    // Radio buttons 
    makeRadioButton(keys[0],possibleAnswers.A); 
    makeRadioButton(keys[1],possibleAnswers.B);
    makeRadioButton(keys[2],possibleAnswers.C);
    makeRadioButton(keys[3],possibleAnswers.D);

    // Compare and add point or remove time
    addComparisonButtons(correctAnswer);
    
}

function endGame(params) {
    alert("The game has ended and displaying scores.")
}
function showResults(params) {
    console.log("Showing results");
}

// submitButton.addEventListener("click",showResults)
// submitButton.addEventListener("click",buildQuiz)
startButton.addEventListener("click",buildQuiz)
startButton.addEventListener("click",countDown)

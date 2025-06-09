// Array of random sentences for the typing test
const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do.",
    "Life is what happens when you're busy making other plans."
];

// DOM elements
const randomTextElement = document.getElementById('randomText');
const userInputElement = document.getElementById('userInput');
const startNewTestButton = document.getElementById('startNewTest');
const finishTestButton = document.getElementById('finishTest');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const timeElement = document.getElementById('time');

// Variables
let currentSentence = '';
let startTime = 0;
let timerInterval = null;
let isTestActive = false;

// Function to load a random sentence
function loadRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    currentSentence = sentences[randomIndex];
    randomTextElement.textContent = currentSentence;
}

// Function to start the test
function startTest() {
    loadRandomSentence();
    userInputElement.value = '';
    userInputElement.disabled = false;
    userInputElement.focus();
    startTime = Date.now();
    isTestActive = true;
    timerInterval = setInterval(updateTimer, 1000);
    finishTestButton.style.display = 'none';
}

// Function to update the timer
function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeElement.textContent = elapsedTime + 's';
}

// Function to calculate WPM
function calculateWPM(correctWords, timeInMinutes) {
    return Math.round(correctWords / timeInMinutes);
}

// Function to calculate accuracy
function calculateAccuracy(correctChars, totalChars) {
    return Math.round((correctChars / totalChars) * 100);
}

// Function to check user input
function checkInput() {
    if (!isTestActive) return;

    const userInput = userInputElement.value;
    let correctChars = 0;
    let totalChars = currentSentence.length;

    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === currentSentence[i]) {
            correctChars++;
        }
    }

    const timeInMinutes = (Date.now() - startTime) / 60000;
    const correctWords = correctChars / 5; // Assuming 5 characters per word
    const wpm = calculateWPM(correctWords, timeInMinutes);
    const accuracy = calculateAccuracy(correctChars, totalChars);

    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy + '%';

    if (userInput.length === currentSentence.length) {
        endTest();
    }
}

// Function to end the test
function endTest() {
    clearInterval(timerInterval);
    userInputElement.disabled = true;
    isTestActive = false;
    finishTestButton.style.display = 'block';

    // Save results to localStorage
    localStorage.setItem('wpm', wpmElement.textContent);
    localStorage.setItem('accuracy', accuracyElement.textContent);
    localStorage.setItem('time', timeElement.textContent);
}

// Event listeners
startNewTestButton.addEventListener('click', startTest);
finishTestButton.addEventListener('click', endTest);
userInputElement.addEventListener('input', checkInput);

// Initial load
loadRandomSentence(); 
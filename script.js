const quizzes = [
    { emoji: '🎬🚀', answer: 'Star Wars' },
    { emoji: '🕷️🧑', answer: 'Spider Man' },
    { emoji: '🐉🔥', answer: 'Dragon Fire' },
    { emoji: '🍕🐢', answer: 'Teenage Mutant Ninja Turtles' },
    { emoji: '👑🧊', answer: 'Frozen' },
    { emoji: '⚡️🧙', answer: 'Harry Potter' },
    { emoji: '🌋🦎', answer: 'Godzilla' },
    { emoji: '🐯👑', answer: 'Tiger King' },
    { emoji: '⛺🔥', answer: 'campfire' },
    { emoji: '🍔🍟', answer: 'fast food' }
];

let attempts = 0;
const maxAttempts = 6;

function getQuizOfTheDay() {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const dayOfYear = Math.floor(diff / 86400000); // ms per day
    return quizzes[dayOfYear % quizzes.length];
}

const currentQuiz = getQuizOfTheDay();
document.getElementById('emoji-display').textContent = currentQuiz.emoji;

const input = document.getElementById('guess-input');
const message = document.getElementById('message');

document.getElementById('guess-btn').addEventListener('click', () => {
    const guess = input.value.trim().toLowerCase();
    if (!guess) return;
    attempts++;
    if (guess === currentQuiz.answer.toLowerCase()) {
        message.textContent = `Correct! The answer was "${currentQuiz.answer}"`;
        input.disabled = true;
    } else if (attempts >= maxAttempts) {
        message.textContent = `Out of attempts! The answer was "${currentQuiz.answer}"`;
        input.disabled = true;
    } else {
        const remaining = maxAttempts - attempts;
        message.textContent = `Wrong! Attempts left: ${remaining}`;
    }
    input.value = '';
});

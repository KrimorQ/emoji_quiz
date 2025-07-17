document.addEventListener('DOMContentLoaded', () => {
const quizzes = [
    { emoji: '🎬🚀', answer: 'Star Wars', category: 'Movies' },
    { emoji: '🕷️🧑', answer: 'Spider Man', category: 'Movies' },
    { emoji: '🐉🔥', answer: 'Dragon Fire', category: 'Movies' },
    { emoji: '🍕🐢', answer: 'Teenage Mutant Ninja Turtles', category: 'Movies' },
    { emoji: '👑🧊', answer: 'Frozen', category: 'Movies' },
    { emoji: '⚡️🧙', answer: 'Harry Potter', category: 'Movies' },
    { emoji: '🌋🦎', answer: 'Godzilla', category: 'Movies' },
    { emoji: '🐯👑', answer: 'Tiger King', category: 'Movies' },

    { emoji: '🍙👹', answer: 'Demon Slayer', category: 'Anime' },
    { emoji: '⚡️🍥', answer: 'Naruto', category: 'Anime' },
    { emoji: '👊🏫', answer: 'My Hero Academia', category: 'Anime' },

    { emoji: '🍄🧑', answer: 'Super Mario', category: 'Video Games' },
    { emoji: '🔫👾', answer: 'Space Invaders', category: 'Video Games' },
    { emoji: '🧟🔫', answer: 'Resident Evil', category: 'Video Games' },

    { emoji: '⛺🔥', answer: 'campfire', category: 'Other' },
    { emoji: '🍔🍟', answer: 'fast food', category: 'Other' }
];

let attempts = 0;
const maxAttempts = 6;
let lives = 3;
let challengeQuizzes = [];
let challengeIndex = 0;
let inDailyChallenge = false;

function getQuizOfTheDay(category) {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const dayOfYear = Math.floor(diff / 86400000); // ms per day
    const qs = quizzes.filter(q => q.category === category);
    return qs[dayOfYear % qs.length];
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function startDailyChallenge() {
    inDailyChallenge = true;
    lives = 3;
    challengeQuizzes = shuffle([...quizzes]).slice(0, 5);
    challengeIndex = 0;
    document.getElementById('category-selection').hidden = true;
    document.getElementById('quiz-section').hidden = false;
    showChallengeQuestion();
}

function showChallengeQuestion() {
    currentQuiz = challengeQuizzes[challengeIndex];
    document.getElementById('emoji-display').textContent = currentQuiz.emoji;
    message.textContent = '';
    input.disabled = false;
    input.value = '';
    livesDisplay.textContent = `Lives: ${lives}`;
    input.focus();
}

let currentQuiz = null;

const input = document.getElementById('guess-input');
const message = document.getElementById('message');
const hintBtn = document.getElementById('hint-btn');
const livesDisplay = document.getElementById('lives');

function startQuiz(category) {
    if (category === 'Daily Challenge') {
        startDailyChallenge();
        return;
    }

    attempts = 0;
    inDailyChallenge = false;
    currentQuiz = getQuizOfTheDay(category);
    document.getElementById('emoji-display').textContent = currentQuiz.emoji;
    message.textContent = '';
    input.disabled = false;
    input.value = '';
    livesDisplay.textContent = '';
    document.getElementById('quiz-section').hidden = false;
    document.getElementById('category-selection').hidden = true;
    input.focus();
}

document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => startQuiz(btn.dataset.category));
});

document.getElementById('guess-btn').addEventListener('click', () => {
    const guess = input.value.trim().toLowerCase();
    if (!guess) return;
    if (inDailyChallenge) {
        if (guess === currentQuiz.answer.toLowerCase()) {
            message.textContent = 'Correct!';
            challengeIndex++;
            if (challengeIndex >= challengeQuizzes.length) {
                message.textContent = 'You completed the challenge!';
                input.disabled = true;
            } else {
                showChallengeQuestion();
            }
        } else {
            lives--;
            if (lives <= 0) {
                message.textContent = `Out of lives! The answer was "${currentQuiz.answer}"`;
                input.disabled = true;
            } else {
                message.textContent = `Wrong! Lives left: ${lives}`;
                livesDisplay.textContent = `Lives: ${lives}`;
            }
        }
    } else {
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
    }
    input.value = '';
});

hintBtn.addEventListener('click', () => {
    if (currentQuiz) {
        message.textContent = `Hint: ${currentQuiz.category}`;
    }
});
});

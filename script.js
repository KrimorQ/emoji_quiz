const quizzes = [
    { emoji: '🎬🚀', answer: 'Star Wars', category: 'Movies' },
    { emoji: '🕷️🧑', answer: 'Spider Man', category: 'Movies' },
    { emoji: '🐉🔥', answer: 'Dragon Fire', category: 'Movies' },
    { emoji: '🍕🐢', answer: 'Teenage Mutant Ninja Turtles', category: 'Movies' },
    { emoji: '👑🧊', answer: 'Frozen', category: 'Movies' },
    { emoji: '⚡️🧙', answer: 'Harry Potter', category: 'Movies' },
    { emoji: '🌋🦎', answer: 'Godzilla', category: 'Movies' },
    { emoji: '🐯👑', answer: 'Tiger King', category: 'Movies' },
    { emoji: '⛺🔥', answer: 'campfire', category: 'Other' },
    { emoji: '🍔🍟', answer: 'fast food', category: 'Other' }
];

let attempts = 0;
const maxAttempts = 6;

function getQuizOfTheDay(category) {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today - start;
    const dayOfYear = Math.floor(diff / 86400000); // ms per day
    const qs = quizzes.filter(q => q.category === category);
    return qs[dayOfYear % qs.length];
}

let currentQuiz = null;

const input = document.getElementById('guess-input');
const message = document.getElementById('message');

function startQuiz(category) {
    attempts = 0;
    currentQuiz = getQuizOfTheDay(category);
    document.getElementById('emoji-display').textContent = currentQuiz.emoji;
    message.textContent = '';
    input.disabled = false;
    input.value = '';
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

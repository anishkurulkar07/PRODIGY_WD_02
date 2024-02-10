const display = document.querySelector('.display');
const lapsContainer = document.querySelector('.laps');
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

document.querySelector('.start').addEventListener('click', startTimer);
document.querySelector('.stop').addEventListener('click', stopTimer);
document.querySelector('.reset').addEventListener('click', resetTimer);
document.querySelector('.lap').addEventListener('click', recordLap);

function startTimer() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
    }
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (timerInterval) {
        const lapTime = elapsedTime;
        const lapItem = document.createElement('div');
        lapItem.textContent = formatTime(lapTime);
        lapsContainer.appendChild(lapItem);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

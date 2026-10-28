
const timerDisplay = document.getElementById("timer");

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");

let remainingTime = 0;
let interval = null;
let running = false;

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0")
    ].join(":");
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(remainingTime);
}

function startTimer() {
    if (running) return;

    if (remainingTime <= 0) {
        const hours = Number(hoursInput.value);
        const minutes = Number(minutesInput.value);
        const seconds = Number(secondsInput.value);

        if (
            hoursInput.value === "" ||
            minutesInput.value === "" ||
            secondsInput.value === "" ||
            !Number.isInteger(hours) ||
            !Number.isInteger(minutes) ||
            !Number.isInteger(seconds) ||
            hours < 0 ||
            hours > 999 ||
            minutes < 0 ||
            minutes > 59 ||
            seconds < 0 ||
            seconds > 59
        ) {
            message.textContent = "Please enter valid time values.";
            return;
        }

        remainingTime = hours * 3600 + minutes * 60 + seconds;
    }

    if (remainingTime <= 0) {
        message.textContent = "Please set a time first!";
        return;
    }

    running = true;
    message.textContent = "Timer is running...";

    updateDisplay();

    interval = setInterval(() => {
        remainingTime--;
        updateDisplay();

        if (remainingTime <= 0) {
            clearInterval(interval);
            interval = null;
            running = false;
            message.textContent = "🎉 Time is up!";

            alert("Time is up!");
        }
    }, 1000);
}

function pauseTimer() {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    running = false;
    message.textContent = "Timer paused.";
}

function resetTimer() {
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    running = false;
    remainingTime = 0;

    hoursInput.value = 0;
    minutesInput.value = 5;
    secondsInput.value = 0;

    updateDisplay();
    message.textContent = "Timer reset. Ready to start?";
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();

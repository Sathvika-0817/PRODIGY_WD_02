let isRunning = false;
let startTime;
let interval;
let pauseTime;

const display = document.getElementById("display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
    document.getElementById("hours").textContent = String(hours).padStart(2, '0');
    document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
    document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');
}

startPauseButton.addEventListener("click", function () {
    if (isRunning) {
        clearInterval(interval);
        startPauseButton.textContent = "Resume";
        pauseTime = new Date().getTime();
    } else {
        startTime = startTime ? startTime + (new Date().getTime() - pauseTime) : new Date().getTime();
        interval = setInterval(updateDisplay, 1000); 
        startPauseButton.textContent = "Pause";
    }
    isRunning = !isRunning;
});

resetButton.addEventListener("click", function () {
    clearInterval(interval);
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    isRunning = false;
    startPauseButton.textContent = "Start";
    lapList.innerHTML = "";
    startTime = null;
    pauseTime = null;
});

lapButton.addEventListener("click", function () {
    if (isRunning) {
        const lapTime = `${String(document.getElementById("hours").textContent).padStart(2, '0')}:
                          ${String(document.getElementById("minutes").textContent).padStart(2, '0')}:
                          ${String(document.getElementById("seconds").textContent).padStart(2, '0')}`;
        const lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
});
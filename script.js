import { createTimingContext } from './timingContext.js';

const bpmButton = document.getElementById('bpm-button');
const elapsedDisplay = document.getElementById('elapsed-display');
const tapCountDisplay = document.getElementById('tap-count');
const bpmDisplay = document.getElementById('bpm-display');
const buttonAnimationClass = 'button-tap';

let animationFrameId;
let context = null;

bpmButton.addEventListener('click', () => {
    context = context ? context.tap(Date.now()) : createTimingContext(1, 0, Date.now());
    bpmButton.classList.add(buttonAnimationClass);
    setTimeout(() => {
        bpmButton.classList.remove(buttonAnimationClass);
    }, 25);
});


function draw() {
    if (context) {
        const elapsedTimeInSeconds = (Date.now() - context.startTime) / 1000;
        elapsedDisplay.textContent = `${elapsedTimeInSeconds.toFixed(2)}`;
        bpmDisplay.textContent = `BPM: ${context.bpm.toFixed(2)}`;
        tapCountDisplay.textContent = `Bar: ${context.barNumber()} ${'*'.repeat(context.beatInBar())}`;
    }
    animationFrameId = requestAnimationFrame(draw);
}

draw();
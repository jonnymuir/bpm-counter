import { createTimingContext } from './timingContext.js';
import { createBeat } from './beat.js';

const bpmButton = document.getElementById('bpm-button');
const tapCountDisplay = document.getElementById('tap-count');
const beatInput = document.getElementById('beat-input');
const buttonAnimationClass = 'button-tap';
const waveform1 = document.getElementById('waveform1');

let animationFrameId;
let context = null;

bpmButton.addEventListener('click', () => {
    context = context ? context.tap(Date.now()) : createTimingContext(1, 0, Date.now());
    bpmButton.classList.add(buttonAnimationClass);
    setTimeout(() => {
        bpmButton.classList.remove(buttonAnimationClass);
    }, 25);
});

const playButton = document.getElementById('play-button1');

let beat1 = createBeat(beatInput.value);
let isPlaying = false;

playButton.addEventListener('click', () => {
    if (isPlaying) {
        beat1.stop();
        playButton.textContent = 'Play';
    } else {
        beat1.play();
        playButton.textContent = 'Stop';
    }
    isPlaying = !isPlaying;
});


function draw() {
    if (context) {
        beatInput.value = context.bpm.toFixed(2);
        tapCountDisplay.textContent = `Bar: ${context.barNumber()} ${'*'.repeat(context.beatInBar())}`;
    }

    beat1.draw(waveform1);

    animationFrameId = requestAnimationFrame(draw);
}

draw();
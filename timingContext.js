export function createTimingContext(beat, bpm, startTime, tapTime = startTime, options = {
    firstBeatResetTimeMs: 4000, // Milliseconds between first and next tap before reseting to beginning
    resetBeats: 2, // Number of beats missed before reseting to beginning
    beatsPerBar: 4
}) {
    return {
        beat,
        bpm,
        startTime,
        tapTime,
        tap(tapTime) {
            const timeSinceLastTap = tapTime - this.tapTime;
            const reset = (this.beat == 1 && timeSinceLastTap > options.firstBeatResetTimeMs) ||
                (timeSinceLastTap > (60000 * options.resetBeats) / this.bpm);

            return reset ?
                createTimingContext(1, 0, tapTime, tapTime, options) :
                createTimingContext(this.beat + 1, (this.beat / (tapTime - this.startTime)) * 60000, this.startTime, tapTime, options);
        },
        barNumber() {
            return Math.ceil(this.beat / options.beatsPerBar);
        },
        beatInBar() {
            return ((this.beat - 1) % options.beatsPerBar) + 1;
        }
    };
}
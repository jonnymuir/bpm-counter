export function createBeat(bpm) {
  const synth = new Tone.MembraneSynth().toDestination();
  let loop;

  return {
    play() {
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.start();

      loop = new Tone.Loop((time) => {
        synth.triggerAttackRelease('C2', '8n', time);
      }, '4n').start(0);
    },

    stop() {
      Tone.Transport.stop();
      loop.stop();
    },

    draw(canvas) {
      // You might need to explore Tone.js's visualization capabilities or integrate a custom visualization
      // using the Web Audio API's AnalyserNode.
    }
  };
}
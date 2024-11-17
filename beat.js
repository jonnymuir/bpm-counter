export function createBeat(bpm) {
  const synth = new Tone.MembraneSynth().toDestination();
  const analyzer = new Tone.Analyser('waveform');
  synth.connect(analyzer);
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

    updateBPM(newBPM) {
      Tone.Transport.bpm.value = newBPM;
    },

    draw(canvas) {
      const ctx = canvas.getContext('2d');
      const waveform = analyzer.getValue();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const halfHeight = canvasHeight / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw the midline
      ctx.beginPath();
      ctx.strokeStyle = 'gray';
      ctx.moveTo(0, halfHeight);
      ctx.lineTo(canvasWidth, halfHeight);
      ctx.stroke();

      // Draw the waveform
      ctx.beginPath();
      ctx.strokeStyle = 'black';
      ctx.moveTo(0, halfHeight + waveform[0] * halfHeight);

      for (let i = 1; i < waveform.length; i++) {
        const y = halfHeight + waveform[i] * halfHeight;
        ctx.lineTo(i * canvasWidth / waveform.length, y);
      }

      ctx.stroke();
    }
  };
}
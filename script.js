const tecles = document.querySelectorAll('.tecla, .tecla-negra');

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const frequencies = [
  261.63, // C
  277.18, // C#
  293.66, // D
  311.13, // D#
  329.63, // E
  349.23, // F
  369.99, // F#
  392.00, // G
  415.30, // G#
  440.00, // A
  466.16, // A#
  493.88  // B
];

const playNote = (frequency) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(audioContext.currentTime);
  return { oscillator, gainNode };
};

const stopNote = (note) => {
  note.gainNode.gain.setValueAtTime(1, audioContext.currentTime);
  note.gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.01);
  note.oscillator.stop(audioContext.currentTime + 0.02);
};

tecles.forEach(tecla => {
  tecla.addEventListener('mousedown', () => {
    const nota = tecla.getAttribute('data-note');
    tecla.notePlaying = playNote(frequencies[nota]);
  });
});

tecles.forEach(tecla => {
  tecla.addEventListener('mouseup', () => {
    stopNote(tecla.notePlaying);
  });
});

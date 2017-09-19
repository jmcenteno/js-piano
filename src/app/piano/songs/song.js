function createEvent(name, keyCode) {

  const event = new KeyboardEvent(name, {
    bubbles: true,
    cancelable: true,
    shiftKey: true
  });

  delete event.keyCode;
  Object.defineProperty(event, 'keyCode', { value: keyCode });

  return event;

}

function playNote(keyCode, duration) {

  document.dispatchEvent(createEvent('keydown', keyCode));

  setTimeout(() => {
    document.dispatchEvent(createEvent('keyup', keyCode));
  }, duration);

}

class Song {

  constructor() {

    this.interval = null;
    this.counter = 0;
    this.score = [];

    const baseTempo = 1600;

    this.durations = {
      whole: baseTempo,
      half: baseTempo / 2,
      quarter: baseTempo / 4,
      eigth: baseTempo / 8,
      sixteenth: baseTempo / 16
    };

  }

  getNoteDurations(tempo) {

    return {
      whole: tempo,
      half: tempo / 2,
      quarter: tempo / 4,
      eigth: tempo / 8,
      sixteenth: tempo / 16
    };

  }

  start(score) {

    this.counter = 0;
    this.interval = setInterval(() => {

      if (score[this.counter]) {
        playNote(score[this.counter].keyCode, score[this.counter].duration);
      }

      this.counter += 1;

      if (this.counter >= score.length) {
        this.counter = 0;
      }

    }, this.durations.eigth);

  }

  stop() {

    this.counter = 0;
    clearInterval(this.interval);

  }

}

export default Song;

import notes from './notes';
import Key from './key';
import DemoSong from './songs/demo';

export default class Piano {

  constructor(rootElement) {

    if (rootElement instanceof Element) {
      this.rootElement = rootElement;
    } else if (typeof rootElement === 'string') {
      this.rootElement = document.querySelector(rootElement);
    }

    if (!this.rootElement) {
      throw (new Error('Invalid DOM element'));
    }

    this.keys = {};
    this.waveform = 'triangle';
    this.demoPlaying = false;
    this.demoSong = new DemoSong();

    this.setWaveform = this.setWaveform.bind(this);
    this.toggleDemo = this.toggleDemo.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.showInstructions = this.showInstructions.bind(this);

  }

  init() {

    this.destroy();

    const top = document.createElement('div');
    const title = document.createElement('h1');
    const instructions = document.createElement('div');
    const container = document.createElement('div');

    title.innerHTML = 'JS Piano <br /><small>Web Audio API</small>';
    title.className = 'title';

    top.appendChild(title);
    top.appendChild(this.createControls());
    top.className = 'top';

    instructions.innerText = 'Use your keboard to play notes';
    instructions.className = 'instructions';

    container.appendChild(top);
    container.appendChild(this.createKeys(notes));
    container.appendChild(instructions);
    container.className = 'keyboard';

    this.rootElement.appendChild(container);

    window.addEventListener('keydown', this.play);
    window.addEventListener('keyup', this.stop);
    window.addEventListener('click', this.showInstructions);

  }

  destroy() {

    this.rootElement.innerHTML = '';

  }

  createKeys(data) {

    const list = document.createElement('ul');

    list.classList.add('keys');

    // generate keys
    data.forEach((note) => {

      const item = new Key(
        note.keyCode,
        note.noteName,
        note.keyName,
        note.frequency,
        this.waveform
      );

      this.keys[note.keyCode] = item.sound;

      list.appendChild(item.element);

    });

    return list;

  }

  createControls() {

    const container = document.createElement('div');
    const button = document.createElement('button');

    button.addEventListener('click', this.toggleDemo);
    button.innerText = !this.demoPlaying ? 'Play' : 'Stop';
    button.className = 'btn';

    container.appendChild(this.createWaveformSelector());
    container.appendChild(button);
    container.className = 'controls';

    return container;

  }

  createWaveformSelector() {

    const container = document.createElement('div');
    const select = document.createElement('select');

    select.value = this.waveform;
    select.addEventListener('change', this.setWaveform);

    const waveforms = ['triangle', 'sine', 'square', 'sawtooth'];

    waveforms.forEach((item) => {

      const option = document.createElement('option');

      option.innerText = item;
      option.value = item;
      option.selected = this.waveform === item;

      select.appendChild(option);

    });

    const label = document.createElement('label');

    label.classList.add('control-label');
    label.innerText = 'Waveform';
    label.appendChild(select);

    container.appendChild(label);
    container.className = 'waveform-control';

    return container;

  }

  setWaveform(e) {

    this.waveform = e.target.value;

    Object.keys(this.keys).forEach((key) => {
      this.keys[key].stop();
    });

    this.init();

  }

  play(e) {

    e.preventDefault();

    let keyCode = e.keyCode || e.target.getAttribute('data-key');

    if (keyCode === 186) {
      keyCode = 59;
    }

    if (!this.keys[keyCode]) return;

    // Pipe sound to output (AKA speakers)
    this.keys[keyCode].play();

    this.rootElement.querySelector(`li[data-key="${keyCode}"]`).classList.add('playing');

  }

  stop(e) {

    let keyCode = e.keyCode || e.target.getAttribute('data-key');

    if (keyCode === 186) {
      keyCode = 59;
    }

    if (!this.keys[keyCode]) return;

    // Kill connection to output
    this.keys[keyCode].stop();

    this.rootElement.querySelector(`li[data-key="${keyCode}"]`).classList.remove('playing');

  }

  showInstructions(e) {

    const keyCode = e.target.getAttribute('data-key');
    const instructions = this.rootElement.querySelector('.instructions');

    if (!this.keys[keyCode] || instructions.classList.contains('show')) return;

    instructions.classList.add('show');

    setTimeout(() => {
      instructions.classList.remove('show');
    }, 3000);

  }

  toggleDemo() {

    if (!this.demoPlaying) {
      this.demoSong.play();
    } else {
      this.demoSong.stop();
    }

    this.demoPlaying = !this.demoPlaying;

    document.querySelector('.btn').innerText = !this.demoPlaying ? 'Play' : 'Stop';

  }

}

import Sound from './sound';

class Key {

  constructor(keyCode, noteName, keyName, frequency, type = 'triangle') {

    this.element = document.createElement('li');

    this.element.setAttribute('data-key', keyCode);
    this.element.classList.add('key');
    this.element.classList.add(noteName.indexOf('#') === -1 ? 'white' : 'black');

    this.sound = new Sound(frequency, type);

  }

}

export default Key;

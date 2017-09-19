import sinon from 'sinon';

import Piano from '../src/app/piano';
import notes from '../src/app/piano/notes';

describe('Piano', () => {

  const fixture = '<div id="root"></div>';
  let piano;

  beforeEach(() => {

    document.body.insertAdjacentHTML('afterbegin', fixture);

    piano = new Piano(document.getElementById('root'));
    piano.init();

  });

  afterEach(() => {
    document.body.removeChild(document.getElementById('root'));
  });

  it('renders a piano', () => {
    expect(document.querySelector('.keyboard')).toBeTruthy();
    expect(document.querySelector('.keyboard .keys')).toBeTruthy();
  });

  it(`creates ${notes.length} keys`, () => {
    expect(document.querySelector('.keyboard .keys').childElementCount).toBe(notes.length);
  });

  describe('play', () => {

    it('plays sounds from the notes collection', () => {

      const spy = sinon.spy(piano.play);

      notes.forEach((item) => {
        
        const event = new KeyboardEvent('keydown', {
          bubbles: true,
          cancelable: true,
          shiftKey: true
        });
        
        delete event.keyCode;
        
        Object.defineProperty(event, 'keyCode', { value: item.keyCode });
        
        document.dispatchEvent(event);
        
        sinon.assert.callCount(spy);
        
      });
      
    });

  });

});

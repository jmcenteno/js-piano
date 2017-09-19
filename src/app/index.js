import Piano from './piano';
import '../scss/styles.scss';

/* eslint-disable wrap-iife, func-names */
(function () {

  window.addEventListener('load', () => {

    const piano = new Piano(document.getElementById('root'));

    piano.init();

  });

})();

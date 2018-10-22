/* global window */
/* eslint-disable */
import Mads from 'mads-custom';
import './main.css';

class AdUnit extends Mads {
  constructor() {
    super();

    // this.loadJS('https://code.jquery.com/jquery-1.11.3.min.js').then(() => {
    //   console.log(typeof window.jQuery !== 'undefined' ? 'jquery loaded' : 'jquery not loaded');
    // });
  }

  render() {
    // console.log('data', this.data);

    // this.custTracker = ['http://www.tracker.com?type={{rmatype}}'];

    // this.tracker('CTR', 'test');

    // this.linkOpener('http://www.google.com');

    return `
      <div class="container">
        <img src="${this.data.bg}" id="bg"/>
        <div id="left"><img src="${this.data.icon}" id="icon"/></div>
        <div id="right"><img src="${this.data.icon}" id="icon"/></div>
      </div>
    `;
  }

    style() {
        return [];
    }

    events() {
        let left = document.getElementById('left')
        let right = document.getElementById('right')

        left.addEventListener('click', () => {
            this.tracker('E', 'clickthrough')
            this.linkOpener(this.data.clickthrough);
        })
        right.addEventListener('click', () => {
            this.tracker('E', 'clickthrough')
            this.linkOpener(this.data.clickthrough);
        })
    }
}

window.ad = new AdUnit();

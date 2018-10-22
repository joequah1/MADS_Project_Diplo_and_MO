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
        <div id="draggable">
        <img src="${this.data.icon}" id="icon"/>
        </div>
      </div>
    `;
  }

    style() {
        return [];
    }

    events() {
        let _this = this
        let draggable = document.getElementById('draggable')

        function dragElement(elmnt) {
            var pos1 = 0, pos3 = 0;
            elmnt.addEventListener('mousedown', dragMouseDown)
            elmnt.addEventListener('touchstart', dragMouseDown)

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
                document.addEventListener('touchend', closeDragElement);
                document.addEventListener('touchmove', elementDrag);
            }

            function elementDrag(e) {
                e = e || window.event;
                // e.preventDefault();
                var x = e.clientX || e.changedTouches[0].clientX
                pos1 = pos3 - x;
                pos3 = x;
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement(e) {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
                e = e || window.event;
                // e.preventDefault();
                var x = e.clientX || e.changedTouches[0].clientX
                var x2 = pos3 - x;
                x = elmnt.offsetLeft - x2

                if (x >= 180 || x <= 85) {
                    let i = x >= 180 ? '225' : '30';
                    elmnt.style.left = i + "px";
                    
                    _this.tracker('E', 'clickthrough')
                    _this.linkOpener(_this.data.clickthrough);
                    setTimeout(() => {
                        elmnt.style.left = "127px";
                    }, 500)
                } else {
                    elmnt.style.left = "127px";
                }
            }
        }
        dragElement(draggable)
    }
}

window.ad = new AdUnit();

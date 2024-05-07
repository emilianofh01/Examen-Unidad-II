import { LitElement, html, css } from "../../libraries/lit.js";
import { bresenham } from "../js/Algorithms/bresenham.js";
import { algorithms } from "../js/Algorithms/index.js";

class Clock extends LitElement {
  _WIDTH = 300;
  _HEIGHT = 300;

  static properties = {
    type: "dda",
    time: {
      type: Object,
    },
  };

  static styles = css`
    :host {
      width: min-content;
      height: min-content;
      display: block;
    }
    canvas {
      /* border: 1px solid black; */
      display: block;
      visibility: visible !important;
    }
    #p5-container {
      width: min-content;
    }
  `;

  firstUpdated() {
    this.initializeP5();
  }

  initializeP5() {
    const container = this.shadowRoot.getElementById("p5-container");

    const sketch = (p) => {
      const xc = this._WIDTH / 2;
      const yc = this._HEIGHT / 2;
      const r = this._WIDTH / 2 - 50;

      p.setup = () => {
        p.frameRate(1);
        p.createCanvas(this._WIDTH, this._HEIGHT);
        p.stroke("white");
      };

      p.draw = () => {
        p.strokeWeight(1);
        p.stroke("white");
        p.background("#121212");
        this.drawCircle(xc, yc, r, p);

        // Se obtiene el tiempo
        let currentTime = this.time;
        if (!currentTime) {
          currentTime = new Date();
        }
        // currentTime = {
        //   second: currentTime.getSeconds(),
        //   minute: currentTime.getMinutes(),
        //   hour: currentTime.getHours() % 12,
        // };
        // Calculando angulo
        const secondAngle = (currentTime.getSeconds() / 60) * 360;
        const minuteAngle = (currentTime.getMinutes() / 60) * 360;
        const hourAngle = ((currentTime.getHours() % 12) / 12) * 360;
        // Se calcula los puntos finales
        const secondEnd = this.calculateEndpoint(xc, yc, 90, secondAngle);
        const minuteEnd = this.calculateEndpoint(xc, yc, 70, minuteAngle);
        const hourEnd = this.calculateEndpoint(xc, yc, 50, hourAngle);

        if (this.type) {
          p.stroke("red");
          algorithms[this.type](p, xc, yc, secondEnd.x, secondEnd.y);

          p.stroke("blue");
          p.strokeWeight(2);
          algorithms[this.type](p, xc, yc, minuteEnd.x, minuteEnd.y);

          p.stroke("gray");
          p.strokeWeight(3);
          algorithms[this.type](p, xc, yc, hourEnd.x, hourEnd.y);
        }

        // console.log(this.time);
        currentTime.setSeconds(currentTime.getSeconds() + 1);
        if(this.type === 'bresenham')
        console.log(currentTime);
      };
    };

    new p5(sketch, container);
  }

  drawCircle(xc, yc, r, p) {
    let x = 0;
    let y = r;
    let pe = 1 - r;

    while (x < y) {
      p.point(xc + x, yc + y);
      p.point(xc - x, yc + y);
      p.point(xc + x, yc - y);
      p.point(xc - x, yc - y);
      p.point(xc + y, yc + x);
      p.point(xc - y, yc + x);
      p.point(xc + y, yc - x);
      p.point(xc - y, yc - x);

      x++;
      if (pe < 0) {
        pe += 2 * x + 1;
      } else {
        y--;
        pe += 2 * (x - y) + 1;
      }
    }
  }

  calculateEndpoint(xc, yc, length, angle) {
    const radians = angle * (Math.PI / 180);
    const x = xc + length * Math.cos(radians - Math.PI / 2);
    const y = yc + length * Math.sin(radians - Math.PI / 2);
    return { x, y };
  }

  render() {
    return html`<div id="p5-container"></div>`;
  }

  updated(props) {
    console.log(props);
  }
}

customElements.define("ek-clock", Clock);

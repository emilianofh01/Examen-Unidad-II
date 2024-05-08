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
        p.angleMode(p.DEGREES); // Usar grados para los ángulos
        p.stroke("white");
      };

      p.draw = () => {
        p.translate(xc, yc); // Centrar el lienzo
        p.rotate(-90); // Ajustar el ángulo para comenzar desde las 12

        p.strokeWeight(1);
        p.stroke("white");
        p.background("#121212");
        this.drawCircle(0, 0, r, p);


        // Se obtiene el tiempo
        let currentTime = this.time;
        if (!currentTime) {
          currentTime = new Date();
        }

        // Calculando angulo
        const secondAngle = (currentTime.getSeconds() / 60) * 360;
        const minuteAngle = (currentTime.getMinutes() / 60) * 360;
        const hourAngle = ((currentTime.getHours() % 12) / 12) * 360;
        // Se calcula los puntos finales
        const secondEnd = this.calculateEndpoint(0, 0, 90, secondAngle);
        const minuteEnd = this.calculateEndpoint(0, 0, 70, minuteAngle);
        const hourEnd = this.calculateEndpoint(0, 0, 50, hourAngle);

        if (this.type) {
          p.stroke("red");
          algorithms[this.type](p, 0, 0, secondEnd.x, secondEnd.y);

          p.stroke("blue");
          p.strokeWeight(2);
          algorithms[this.type](p, 0, 0, minuteEnd.x, minuteEnd.y);

          p.stroke("gray");
          p.strokeWeight(3);
          algorithms[this.type](p, 0, 0, hourEnd.x, hourEnd.y);
        }

        currentTime.setSeconds(currentTime.getSeconds() + 1);
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
    const x = Math.round(xc + length * Math.cos(radians ));
    const y = Math.round(yc + length * Math.sin(radians ));
    return { x, y };
  }

  render() {
    return html`<div id="p5-container"></div>`;
  }

  updated(props) {
    // console.log(props);
  }
}

customElements.define("ek-clock", Clock);

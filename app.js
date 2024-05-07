import { LitElement, css, html } from "./libraries/lit.js";
import "./src/components/Clock.js";

class MyApp extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: inherit;
    }

    .container {
      width: 100%;
      height: 100%;
      background-color: #121212;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .clock__container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    .clock__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1.2em;
      color: white;
      font-family: 'Arial'
    }
  `;

  static properties = {
    time: {
      type: Object
    }
  }

  constructor() {
    super()
    const date = new Date();
    
    this.time = date
  }
  setDate(e) {
    console.log(e.target.value)
    const [hour = 0, minute = 0, second=0] = e.target.value.split(":");

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute)
    date.setSeconds(second)
    this.time = date;
  }

  getAdjustedTime(baseDate, hourAdjustment) {
    const adjustedDate = new Date(baseDate); 
    adjustedDate.setHours(adjustedDate.getHours() + hourAdjustment); 
    return adjustedDate;
  }

  render() {
    const timeMexico = this.getAdjustedTime(this.time, 1); // 1 hora por delante de La Paz
    const timeBarcelona = this.getAdjustedTime(this.time, 8); // 8 horas por delante de La Paz

    return html`
      <div class="container">
        <input type="time" @input=${this.setDate} step="1"/>
        <div class="clock__container">
          <div class="clock__item">
            <ek-clock type="linePointSlope" .time=${this.time}></ek-clock>
            <h2>La Paz</h2>
          </div>
          <div class="clock__item">
            <ek-clock type="dda" .time=${timeMexico}></ek-clock>
            <h2>Ciudad de México</h2>
          </div>
          <div class="clock__item">
            <ek-clock type="bresenham" .time=${timeBarcelona}></ek-clock>
            <h2>Barcelona</h2>
          </div>
        </div>
      </div>
      `;
  }
}

customElements.define("ek-app", MyApp);

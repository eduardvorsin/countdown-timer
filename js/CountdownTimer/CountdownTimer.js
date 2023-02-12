import formatTime from '../helpers/helpers.js';

export default class CountdownTimer {
  constructor(selector, options = {}) {
    this.timerContainer = document.querySelector(selector);

    if (this.timerContainer === null) {
      throw new Error(`The element with the ${selector} selector was not found`);
    }

    this.timerCounter = this.timerContainer.querySelector('[data-timer-counter]');

    if (this.timerCounter === null) {
      throw new Error('The element with the [data-timer-counter] attribute was not found');
    }

    this.options = options;
    this.timer = null;

    if (!this.options.futureDate) {
      this.futureDate = new Date(Date.now() + 60 * 1000);
    } else {
      this.futureDate = new Date(Date.parse(this.options.futureDate));
    }

    if (Number.isNaN(this.futureDate.getTime())) {
      throw new Error('Incorrect date format in the futureDate field');
    }

    this.setTime(this.getRemainingTime());
    this.start();
  }

  setTime(value) {
    if (typeof value !== 'number') {
      throw new Error('The passed value must be of numeric type');
    }

    if (this.isTimeOver()) {
      this.timerCounter.textContent = formatTime(0);
      return;
    }

    this.timerCounter.textContent = formatTime(value);
  }

  isTimeOver() {
    return this.getRemainingTime() <= 0;
  }

  getRemainingTime() {
    return this.futureDate.getTime() - Date.now();
  }

  start() {
    const duration = this.getRemainingTime();
    let prevTime = duration;

    this.options.onStart?.call(undefined, this.timerContainer, this.timerCounter);

    this.timer = requestAnimationFrame(function timeout(timestamp) {
      const currentTime = duration - timestamp;

      if (prevTime - currentTime >= 1000) {
        prevTime = currentTime;

        this.options.onUpdate?.call(undefined, this.timerContainer, this.timerCounter);
      }

      this.setTime(currentTime);

      if (!this.isTimeOver()) {
        this.timer = requestAnimationFrame(timeout.bind(this));
      } else {
        this.options.onEnd?.call(undefined, this.timerContainer, this.timerCounter);
      }
    }.bind(this));
  }

  reset() {
    this.options.onEnd?.call(undefined, this.timerContainer, this.timerCounter);

    this.setTime(0);
    cancelAnimationFrame(this.timer);
  }
}

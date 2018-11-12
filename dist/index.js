/**
 * @module Timer
 */
export default class Timer {
  constructor(cb, interval) {
    // 0 = idle, 1 = running, 2 = paused, 3 = resumed
    this.state = 0;
    this.remaining = -1;
    this.callback = cb;
    this.interval = interval;
  }
  start() {
    if (this.state !== 0)
      return;
    this.startTime = Date.now();
    this.intervalId = setInterval(this.callback, this.interval);
    this.state = 1;
  }
  pause() {
    if (this.state !== 1)
      return;
    this.remaining = (Date.now() - this.startTime) % this.interval;
    clearInterval(this.intervalId);
    this.state = 2;
  }
  resume() {
    if (this.state !== 2)
      return;
    this.state = 3;
    this.timeoutId = setTimeout(() => {
      if (this.state !== 3)
        return;
      this.callback();
      this.state = 0;
      this.start();
    }, this.remaining);
  }
  stop() {
    if (this.state === 0)
      return;
    this.remaining = -1;
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
    this.state = 0;
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = /** @class */ (function () {
    function Timer(cb, interval) {
        // 0 = idle, 1 = running, 2 = paused, 3 = resumed
        this.state = 0;
        this.remaining = -1;
        this.callback = cb;
        this.interval = interval;
    }
    Timer.prototype.start = function () {
        if (this.state !== 0)
            return;
        this.startTime = Date.now();
        this.intervalId = setInterval(this.callback, this.interval);
        this.state = 1;
    };
    Timer.prototype.pause = function () {
        if (this.state !== 1)
            return;
        this.remaining = (Date.now() - this.startTime) % this.interval;
        clearInterval(this.intervalId);
        this.state = 2;
    };
    Timer.prototype.resume = function () {
        var _this = this;
        if (this.state !== 2)
            return;
        this.state = 3;
        this.timeoutId = setTimeout(function () {
            if (_this.state !== 3)
                return;
            _this.callback();
            _this.state = 0;
            _this.start();
        }, this.remaining);
    };
    Timer.prototype.stop = function () {
        if (this.state === 0)
            return;
        this.remaining = -1;
        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);
        this.state = 0;
    };
    return Timer;
}());
exports.default = Timer;

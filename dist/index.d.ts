export default class Timer {
    private callback;
    private interval;
    private state;
    private intervalId;
    private timeoutId;
    private startTime;
    private remaining;
    constructor(cb: () => void, interval: number);
    start(): void;
    pause(): void;
    resume(): void;
    stop(): void;
}

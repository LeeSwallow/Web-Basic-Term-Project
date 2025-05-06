export class Timer {
    private static instance: Timer;
    private interval: number | null = null;
    private time: number = 0;
    private subscribers: ((time: number) => void)[] = [];

    private constructor() {}

    public static getInstance(): Timer {
        if (!Timer.instance) {
            Timer.instance = new Timer();
        }
        return Timer.instance;
    }

    public start(): void {
        if (this.interval === null) {
            this.interval = window.setInterval(() => {
                this.time += 1;
                this.notifySubscribers();
            }, 1000);
        }
    }

    public stop(): void {
        if (this.interval !== null) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    public reset(): void {
        this.time = 0;
        this.notifySubscribers();
    }

    public getTime(): number {
        return this.time;
    }

    public subscribe(callback: (time: number) => void): void {
        this.subscribers.push(callback);
    }

    public unsubscribe(callback: (time: number) => void): void {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }

    private notifySubscribers(): void {
        this.subscribers.forEach(callback => callback(this.time));
    }
} 
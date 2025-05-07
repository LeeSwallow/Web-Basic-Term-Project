

export interface TimerEvent {
    onTick?: (timerClock : TimerClock) => void;
    onFinish?: () => void;
    onError?: (error: Error) => void;
    onChange?: (state: TimerState) => void;
    onChanged?: (state: TimerState) => void;
}


export interface TimerValue {
    duration: number;
    intervalTime: number;
}

export interface TimerClock {
    currentTime: number;
    lastTime: number;
}

export interface TimerSnapshot {
    timerValue: TimerValue;
    timerEvent?: TimerEvent;
    timerClock?: TimerClock;
    timerState?: TimerState;
}



export enum TimerState {
    IDLE = 'IDLE',
    PAUSED = 'PAUSED',
    RUNNING = 'RUNNING',
    FINISHED = 'FINISHED'
}


export class Timer {
    private _value: TimerValue;
    private _clock : TimerClock;
    private _state: TimerState;
    private _event?: TimerEvent;

    private _intervalId?: NodeJS.Timeout;

    constructor(snapshot: TimerSnapshot) {
        this._value = snapshot.timerValue;
        this._event = snapshot.timerEvent;
        this._state = TimerState.IDLE;
        this._clock = snapshot.timerClock || { currentTime: 0, lastTime: snapshot.timerValue.duration};
        this._state = snapshot.timerState || TimerState.IDLE;
        
        if (this._state === TimerState.RUNNING) {
            this.startTimespan();
        } else {
            this._intervalId = undefined;
        }
    }

    private startTimespan() {
        if (this._intervalId) return;

        this._intervalId = setInterval(() => {

            this._clock.currentTime += this._value.intervalTime;
            this._clock.lastTime -= this._value.intervalTime;
            if (this._clock.lastTime < 0) this._clock.lastTime = 0;
            
            this._event?.onTick?.(this._clock);
            if (this._clock.lastTime <= 0) {
                this.finish();
            }
        }, this._value.intervalTime);
    }

    private stopTimespan() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
    }

    private finish() {
        this._event?.onChange?.(this._state);

        this._event?.onFinish?.();
        this._state = TimerState.FINISHED;
        this.stopTimespan();
        this._event?.onChanged?.(this._state);;
    }


    public start() {
        if (this._state !== TimerState.IDLE) {
            this._event?.onError?.(new Error("Timer is already running or paused"));
            return;
        }

        this._event?.onChange?.(this._state);
        
        this._state = TimerState.RUNNING;
        this._clock.currentTime = 0;
        this._clock.lastTime = this._value.duration;
        this.startTimespan();

        this._event?.onChanged?.(this._state);;
    }

    
    public pause() {
        if (this._state !== TimerState.RUNNING) {
            this._event?.onError?.(new Error("Timer is not running"));
            return;
        }
        this._event?.onChange?.(this._state);
        
        this._state = TimerState.PAUSED;
        this.stopTimespan();

        this._event?.onChanged?.(this._state);;
    }

    public resume() {
        if (this._state !== TimerState.PAUSED) {
            this._event?.onError?.(new Error("Timer is not paused"));
            return;
        }

        this._event?.onChange?.(this._state);

        this._state = TimerState.RUNNING;
        this.startTimespan();
        
        this._event?.onChanged?.(this._state);;
    }

    public reset() {
        if (this._state !== TimerState.PAUSED && this._state !== TimerState.FINISHED) {
            this._event?.onError?.(new Error("Timer is not paused or finished"));
            return;
        }
        this._event?.onChange?.(this._state);

        this._state = TimerState.IDLE;
        this._clock.currentTime = 0;
        this._clock.lastTime = this._value.duration;
        this.stopTimespan();

        this._event?.onChanged?.(this._state);;
    }

    public get state() {
        return this._state;
    }

    public get clock() {
        return this._clock;
    }

    public get snapshot(): TimerSnapshot {
        return {
            timerValue: this._value,
            timerClock: this._clock,
            timerState: this._state
        }
    }

    public get snapshotWithEvent(): TimerSnapshot {
        return {
            timerValue: this._value,
            timerClock: this._clock,
            timerState: this._state,
            timerEvent: this._event
        }
    }
    
    public set value(value: TimerValue) {
        const isRunning: boolean = this._state === TimerState.RUNNING;
        if (isRunning) this.pause();
        this._value = value;
        if (isRunning) this.resume();
    }


    public set event(TimerEvent: TimerEvent) {
        const isRunning: boolean = this._state === TimerState.RUNNING;
        if (isRunning) this.pause();        
        this._event = TimerEvent;
        if (isRunning) this.resume();
    }

    public set snapshot(snapshot: TimerSnapshot) {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }

        this._value = snapshot.timerValue;
        this._event = snapshot.timerEvent;
        this._clock = snapshot.timerClock || { currentTime: 0, lastTime: snapshot.timerValue.duration };
        this._state = snapshot.timerState || TimerState.IDLE;

        if (this._state === TimerState.RUNNING) {
            this.startTimespan();
        } else {
            this._intervalId = undefined;
        }
    }
}   

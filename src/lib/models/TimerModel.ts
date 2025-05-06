

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

import { type TimerSnapshot} from "$lib/models/TimerModel";


export enum PomodoroState {
    WORK = 'WORK',
    SHORT_BREAK = 'SHORT_BREAK',
    LONG_BREAK = 'LONG_BREAK',
}

export interface PomodoroTimerSetting {
    work: TimerSnapshot;
    shortBreak: TimerSnapshot;
    longBreak: TimerSnapshot;
}


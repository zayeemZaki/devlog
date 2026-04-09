---
sidebar_position: 4
title: Split Second Stopwatch
sidebar_label: Split Second Stopwatch
hide_title: true
---

<h1 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
	<span>Split Second Stopwatch</span>
	<span style={{ fontSize: '0.8rem', fontWeight: 400 }}><em>2026-04-08</em></span>
</h1>

My Solution: [Exercism Split Second Stopwatch solution](https://exercism.org/tracks/javascript/exercises/split-second-stopwatch/solutions/zayeemZaki)

## Instructions

Build a stopwatch that tracks the current lap, keeps a list of previous laps, and only allows commands in the right state.

- States: `ready` is the initial state, `running` tracks time, and `stopped` pauses tracking.
- `start` moves `ready` or `stopped` to `running`.
- `stop` moves `running` to `stopped`.
- `lap` is only allowed while `running`; it saves the current lap and resets it.
- `reset` is only allowed while `stopped`; it clears the current lap and previous laps.

## Solution

```javascript
export class SplitSecondStopwatch {
  constructor(command, beginState, endState) {
    this._state = 'ready';
    this._currentLap = 0;
    this._previousLaps = [];
  }

  _formatTime(duration) {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);

    const pad = (num) => num.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  _parseTime(durationString) {
    const [hours, minutes, seconds] = durationString.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  get state() {
    return this._state;
  }

  get currentLap() {
    return this._formatTime(this._currentLap);
  }

  get total() {
    const totalSeconds = this._previousLaps.reduce((sum, cur) => sum + cur, 0) + this._currentLap;
    return this._formatTime(totalSeconds);
  }

  get previousLaps() {
    return this._previousLaps.map(lap => this._formatTime(lap));
  }

  start() {
    if (this._state === 'running') {
      throw new Error('cannot start an already running stopwatch');
    }
    this._state = 'running';
  }

  stop() {
    if (this._state !== 'running') {
      throw new Error('cannot stop a stopwatch that is not running');
    }
    this._state = 'stopped';
  }

  lap() {
    if (this._state !== 'running') {
      throw new Error('cannot lap a stopwatch that is not running');
    }
    this._previousLaps.push(this._currentLap);
    this._currentLap = 0;
  }

  reset() {
    if (this._state !== 'stopped') {
      throw new Error('cannot reset a stopwatch that is not stopped');
    }

    this._state = 'ready';
    this._currentLap = 0;
    this._previousLaps = [];
  }

  advanceTime(duration) {
    if (this._state === 'running') {
      this._currentLap += this._parseTime(duration);
    }
  }
}
```

## Tests

These are the key behaviors to verify:

```javascript
test('new stopwatch starts in ready state', () => {
  const stopwatch = new SplitSecondStopwatch();
  expect(stopwatch.state).toBe('ready');
});

test('lap saves the current lap and resets it', () => {
  const stopwatch = new SplitSecondStopwatch();
  stopwatch.start();
  stopwatch.advanceTime('00:01:38');
  stopwatch.lap();

  expect(stopwatch.previousLaps).toEqual(['00:01:38']);
  expect(stopwatch.currentLap).toBe('00:00:00');
});

test('reset clears previous laps after stopping', () => {
  const stopwatch = new SplitSecondStopwatch();
  stopwatch.start();
  stopwatch.advanceTime('00:00:10');
  stopwatch.lap();
  stopwatch.stop();
  stopwatch.reset();

  expect(stopwatch.state).toBe('ready');
  expect(stopwatch.previousLaps).toEqual([]);
});
```

## Mental Model

The formatting piece is the important part here: `_formatTime` turns total seconds into `HH:MM:SS` by dividing the number into hours, minutes, and seconds, then padding each part to two digits. `_parseTime` does the reverse so `advanceTime` can add the incoming duration to the current lap.

import CountdownTimer from './CountdownTimer';

describe('CountdownTimer tests', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should return an error if the timerContainer element is not found', () => {
    expect.assertions(1);
    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const timer = new CountdownTimer('.timer');
    }).toThrow('The element with the .timer selector was not found');
  });

  it('should return an error if the timerCounter element is not found', () => {
    expect.assertions(1);

    document.body.innerHTML = `
      <div class="timer timer1">
      </div>
    `;

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const timer = new CountdownTimer('.timer');
    }).toThrow('The element with the [data-timer-counter] attribute was not found');
  });

  it('should return an error if when converting futureDate to a number it turned out to be NaN', () => {
    expect.assertions(1);

    document.body.innerHTML = `
      <div class="timer timer1">
        <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
      </div>
    `;

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const timer = new CountdownTimer('.timer', {
        futureDate: 'abcd',
      });
    }).toThrow('Incorrect date format in the futureDate field');
  });

  it('should return an error if the value passed to setTime is not a number', () => {
    expect.assertions(1);

    document.body.innerHTML = `
      <div class="timer timer1">
        <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
      </div>
    `;

    expect(() => {
      // eslint-disable-next-line no-unused-vars
      const timer = new CountdownTimer('.timer');
      timer.setTime('bbcdt');
    }).toThrow('The passed value must be of numeric type');
  });

  it('should set the time to zero if the remaining timer time is out', () => {
    expect.assertions(2);

    document.body.innerHTML = `
      <div class="timer timer1">
        <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
      </div>
    `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now()),
    });

    expect(timer.timerCounter).toHaveTextContent('00:00:00:00');

    timer.setTime(50000);

    expect(timer.timerCounter).toHaveTextContent('00:00:00:00');
  });

  it('should set the time to 30 seconds if the remaining timer time has not run out', () => {
    expect.assertions(2);

    document.body.innerHTML = `
      <div class="timer timer1">
        <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
      </div>
    `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 60),
    });

    expect(timer.timerCounter).toHaveTextContent('00:00:00:59');

    timer.setTime(30000);

    expect(timer.timerCounter).toHaveTextContent('00:00:00:30');
  });

  it('isTimeOver should return false if the timer time has not expired yet', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 60),
    });

    expect(timer.isTimeOver()).toBeFalsy();
  });

  it('isTimeOver should return true if the timer time is out', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now()),
    });

    expect(timer.isTimeOver()).toBeTruthy();
  });

  it('should return 29 seconds of remaining time or less if the current date + 30 seconds is passed to futureDate', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 30),
    });

    expect(timer.getRemainingTime()).toBeLessThanOrEqual(30000);
  });

  it('should return 0 seconds of remaining time or less if the current date is passed to futureDate', () => {
    expect.assertions(1);

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now()),
    });

    expect(timer.getRemainingTime()).toBeLessThanOrEqual(0);
  });

  it('should output the current timer time "00:00:00:00" if the reset method was called', () => {
    expect.assertions(2);

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 60),
    });

    expect(timer.timerCounter).toHaveTextContent('00:00:00:59');

    timer.reset();

    expect(timer.timerCounter).toHaveTextContent('00:00:00:00');
  });

  it('when the start method is called, the timer starts working', () => {
    expect.assertions(2);
    jest.useFakeTimers();

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 60),
    });

    expect(timer.timerCounter).toHaveTextContent('00:00:00:59');

    jest.advanceTimersByTime(33000);

    expect(timer.timerCounter).toHaveTextContent('00:00:00:26');
  });

  it('should call the mock function when passing it to the OnStart property for the timer when the timer starts working', () => {
    expect.assertions(1);
    const mockFn = jest.fn();

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    // eslint-disable-next-line no-unused-vars
    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 60),
      onStart: mockFn,
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should call the mock function 14 times when passing it to the onUpdate property for the timer when the timer updates the value of seconds to 44', () => {
    expect.assertions(1);
    jest.useFakeTimers();
    const mockFn = jest.fn();

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    // eslint-disable-next-line no-unused-vars
    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 60),
      onUpdate: mockFn,
    });

    jest.advanceTimersByTime(15000);

    expect(mockFn).toHaveBeenCalledTimes(14);
  });

  it('should call the mock function when passing it to the onStop property for the timer when the timer finishes', () => {
    expect.assertions(1);
    jest.useFakeTimers();
    const mockFn = jest.fn();

    document.body.innerHTML = `
    <div class="timer timer1">
      <time class="timer__time" role="timer" data-timer-counter>00:00:00:00</time>
    </div>
  `;

    // eslint-disable-next-line no-unused-vars
    const timer = new CountdownTimer('.timer', {
      futureDate: new Date(Date.now() + 1000 * 60),
      onEnd: mockFn,
    });

    jest.advanceTimersByTime(60000);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

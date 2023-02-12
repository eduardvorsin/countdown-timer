import CountdownTimer from './CountdownTimer/CountdownTimer.js';

// eslint-disable-next-line no-unused-vars
const timer1 = new CountdownTimer('.timer1', {
  futureDate: new Date(Date.now() + 1000 * 60),

  onStart() {
    console.log('start');
  },

  onEnd() {
    console.log('end');
  },

  onUpdate() {
    console.log('update');
  },
});

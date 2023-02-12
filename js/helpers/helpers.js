export default function formatTime(value) {
  if (typeof value !== 'number') {
    throw new Error('The passed value must be of numeric type');
  }

  let days = Math.floor(value / 24 / 3600 / 1000);
  let hours = Math.floor((value / 3600 / 1000) % 24);
  let mins = Math.floor((value / 60 / 1000) % 60);
  let secs = Math.floor((value / 1000) % 60);

  days = days < 10 ? `0${days}` : days;
  hours = hours < 10 ? `0${hours}` : hours;
  mins = mins < 10 ? `0${mins}` : mins;
  secs = secs < 10 ? `0${secs}` : secs;

  return `${days}:${hours}:${mins}:${secs}`;
}

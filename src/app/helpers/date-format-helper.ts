export function changeDateFormat(date) {
  if (date) {
    const myDate  = new Date(date);
    return myDate.toLocaleDateString('uk-UA');
  }
  return null;
}

export function changeTimeFormat(time) {
  if (time) {
    const myTime  = new Date(time);
    return myTime.toLocaleTimeString('uk-UA');
  }
  return null;
}

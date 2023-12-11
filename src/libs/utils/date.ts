export const convertDateToString = (date: Date, withTime?: boolean) => {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (year.toString().length === 1) year = "0" + year.toString();
  if (month.toString().length === 1) month = "0" + month.toString();
  if (day.toString().length === 1) day = "0" + day.toString();
  if (withTime) {
    let hour = date.getHours().toString();
    let minute = date.getMinutes().toString();
    let second = date.getSeconds().toString();
    if (hour.toString().length === 1) hour = "0" + hour.toString();
    if (minute.toString().length === 1) minute = "0" + minute.toString();
    if (second.toString().length === 1) second = "0" + second.toString();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  return `${year}-${month}-${day}`;
};

export const convertDatetoYmdString = (date: Date) => {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  month = month.length === 1 ? "0" + month : month;
  let day = date.getDate().toString();
  day = day.length === 1 ? "0" + day : day;
  return `${year}-${month}-${day}`;
};

export const convertDateToString = (date: Date, withTime?: boolean) => {
  const koDtf = new Intl.DateTimeFormat("ko", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "asia/seoul",
  });
  return koDtf.format(new Date(date)).toString();

  //   let year = date.getFullYear().toString();
  //   let month = (date.getMonth() + 1).toString();
  //   let day = date.getDate().toString();
  //   if (year.toString().length === 1) year = "0" + year.toString();
  //   if (month.toString().length === 1) month = "0" + month.toString();
  //   if (day.toString().length === 1) day = "0" + day.toString();
  //   if (withTime) {
  //     let hour = date.getHours().toString();
  //     let minute = date.getMinutes().toString();
  //     let second = date.getSeconds().toString();
  //     if (hour.toString().length === 1) hour = "0" + hour.toString();
  //     if (minute.toString().length === 1) minute = "0" + minute.toString();
  //     if (second.toString().length === 1) second = "0" + second.toString();

  //     return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  //   }
  //   return `${year}-${month}-${day}`;
};

export const isNotIncludeMonth = (selectedDate: Date, targetDate: Date) => {
  return !(selectedDate.getMonth() === targetDate.getMonth());
};

export const isTodayDate = (date: Date) => {
  const nowDate = new Date();
  return (
    `${nowDate.getFullYear()}-${nowDate.getMonth()}-${nowDate.getDate()}` ===
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  );
};

export const isSameDateYmd = (date1: Date, date2: Date) => {
  const date1Ymd = `${date1.getFullYear()}-${date1.getMonth()}-${date1.getDate()}`;
  const date2Ymd = `${date2.getFullYear()}-${date2.getMonth()}-${date2.getDate()}`;
  return date1Ymd === date2Ymd;
};

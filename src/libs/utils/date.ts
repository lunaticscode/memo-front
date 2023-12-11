export const convertDateToString = (date: Date, withTime?: boolean) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  if (withTime) {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  return `${year}-${month}-${day}`;
};

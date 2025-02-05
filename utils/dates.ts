export function toISODate(date: Date) {
  const month = date.getMonth() + 1
  const day = date.getDate()

  const isoDate = [
    date.getFullYear(), 
    month < 10 ? "0" + month : month, 
    day < 10 ? "0" + day : day, 
  ].join("-");

  return isoDate
}
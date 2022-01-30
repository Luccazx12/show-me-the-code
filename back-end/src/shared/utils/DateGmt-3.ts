export const dateGmt = (date: Date) => {
  const hours = date.getHours();
  date.setHours(hours - 3);
  return date;
};
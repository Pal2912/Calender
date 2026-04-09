export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = [];

  // ✅ empty cells before 1st day
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // ✅ actual dates
  for (let i = 1; i <= lastDate; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

export const isSameDay = (d1: Date | null, d2: Date | null) => {
  if (!d1 || !d2) return false;
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};
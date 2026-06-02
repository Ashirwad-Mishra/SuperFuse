export const formatDate = (date: Date | string): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);

  const ampm = h >= 12 ? "PM" : "AM";
  const displayHours = h % 12 || 12;
  return `${displayHours}:${String(m).padStart(2, "0")} ${ampm}`;
};

export const getDisplayDate = (dateString: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const targetDate = new Date(dateString);
  targetDate.setHours(0, 0, 0, 0);

  if (targetDate.getTime() === today.getTime()) {
    return "Today";
  } else if (targetDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  return formatDate(dateString);
};

export const generateTimeSlotLabel = (date: string, startTime: string, endTime: string): string => {
  const displayDate = getDisplayDate(date);
  const displayStart = formatTime(startTime);
  const displayEnd = formatTime(endTime);
  return `${displayDate}, ${displayStart} - ${displayEnd}`;
};

export const getNextNDays = (n: number): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  return dates;
};

export const dateToISO = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

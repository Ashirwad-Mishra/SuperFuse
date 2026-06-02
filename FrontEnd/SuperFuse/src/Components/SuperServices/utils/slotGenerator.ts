import type { TimeSlot } from "../interfaces/TimeSlot";
import { AvailabilityLevel } from "../enums/AvailabilityLevel";
import { getDisplayDate, formatTime, dateToISO } from "./dateFormatter";
import { getNextNDays } from "./dateFormatter";

export const generateTimeSlots = (serviceId: string, days: number = 14): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const dates = getNextNDays(days);
  const timeWindows = [
    { start: "10:00", end: "13:00" },
    { start: "14:00", end: "17:00" },
    { start: "17:00", end: "20:00" },
  ];

  dates.forEach((date) => {
    timeWindows.forEach((window, index) => {
      const dateStr = dateToISO(date);
      const slotId = `${serviceId}-${dateStr}-${index}`;

      // Skip early morning and late evening on first day
      const isToday = new Date().toDateString() === date.toDateString();
      if (isToday) {
        const now = new Date();
        const [slotHour] = window.start.split(":").map(Number);
        if (slotHour <= now.getHours()) {
          return; // Skip past slots
        }
      }

      const availableCount = Math.floor(Math.random() * 5) + 1;
      let availabilityLevel: AvailabilityLevel = AvailabilityLevel.HIGH;
      if (availableCount <= 1) {
        availabilityLevel = AvailabilityLevel.LOW;
      } else if (availableCount <= 3) {
        availabilityLevel = AvailabilityLevel.MEDIUM;
      }

      const displayTime = `${formatTime(window.start)} - ${formatTime(window.end)}`;

      const slot: TimeSlot = {
        id: slotId,
        date: dateStr,
        startTime: window.start,
        endTime: window.end,
        displayDate: getDisplayDate(dateStr),
        displayTime,
        availabilityLevel,
        availableCount,
        priceModifier: window.start >= "17:00" ? 1.2 : 1.0,
        isAvailable: true,
      };

      slots.push(slot);
    });
  });

  return slots;
};

export const filterSlotsByDate = (slots: TimeSlot[], date: string): TimeSlot[] => {
  return slots.filter((slot) => slot.date === date);
};

export const getAvailableDates = (slots: TimeSlot[]): string[] => {
  const dates = new Set<string>();
  slots.forEach((slot) => {
    if (slot.isAvailable) {
      dates.add(slot.date);
    }
  });
  return Array.from(dates).sort();
};

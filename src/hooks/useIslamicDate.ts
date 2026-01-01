import { useState, useEffect } from 'react';
import { ISLAMIC_MONTHS } from '../constants';

interface IslamicDate {
  day: number;
  month: number;
  monthName: string;
  year: number;
  formatted: string;
}

// Simple Hijri date approximation
// For production, use a proper library like @tablab/hijri-date or similar
function gregorianToHijri(date: Date): { day: number; month: number; year: number } {
  const jd =
    Math.floor((1461 * (date.getFullYear() + 4800 + Math.floor((date.getMonth() + 1 - 14) / 12))) / 4) +
    Math.floor((367 * (date.getMonth() + 1 - 2 - 12 * Math.floor((date.getMonth() + 1 - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((date.getFullYear() + 4900 + Math.floor((date.getMonth() + 1 - 14) / 12)) / 100)) / 4) +
    date.getDate() -
    32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 = l2 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;

  return { day, month, year };
}

export function useIslamicDate(): IslamicDate {
  const [islamicDate, setIslamicDate] = useState<IslamicDate>({
    day: 1,
    month: 1,
    monthName: ISLAMIC_MONTHS[0],
    year: 1446,
    formatted: '1 Muharram 1446',
  });

  useEffect(() => {
    const now = new Date();
    const hijri = gregorianToHijri(now);
    const monthIndex = Math.min(Math.max(hijri.month - 1, 0), 11);
    const monthName = ISLAMIC_MONTHS[monthIndex];

    setIslamicDate({
      day: hijri.day,
      month: hijri.month,
      monthName,
      year: hijri.year,
      formatted: `${hijri.day} ${monthName} ${hijri.year}`,
    });
  }, []);

  return islamicDate;
}

export function formatIslamicDate(day: number, month: number, year: number): string {
  const monthName = ISLAMIC_MONTHS[Math.min(Math.max(month - 1, 0), 11)];
  return `${day} ${monthName} ${year}`;
}

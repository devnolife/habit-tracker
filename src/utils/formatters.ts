/**
 * Format currency with proper locale
 */
export function formatCurrency(
  amount: number,
  currency: string = 'IDR',
  locale: string = 'id-ID'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with compact notation (1K, 1M, etc.)
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format time from Date or string (HH:mm)
 */
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Format date (DD MMM YYYY)
 */
export function formatDate(
  date: Date | string,
  format: 'short' | 'medium' | 'long' = 'medium'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  switch (format) {
    case 'short':
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
      });
    case 'long':
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    default:
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
  }
}

/**
 * Get relative time string (Today, Yesterday, etc.)
 */
export function getRelativeDay(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (d.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return formatDate(d, 'short');
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Format percentage string
 */
export function formatPercentage(value: number, total: number): string {
  return `${calculatePercentage(value, total)}%`;
}

/**
 * Get greeting based on current time
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 21) return 'Good Evening';
  return 'Good Night';
}

/**
 * Get Islamic greeting based on current time
 */
export function getIslamicGreeting(): string {
  return 'Assalamualaikum';
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get start and end of current week
 */
export function getCurrentWeekRange(): { start: Date; end: Date } {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const start = new Date(now);
  start.setDate(now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

/**
 * Get start and end of current month
 */
export function getCurrentMonthRange(): { start: Date; end: Date } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  return { start, end };
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toDateString() === new Date().toDateString();
}

/**
 * Get days array for a month
 */
export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

// Date formatting utilities
export function formatDate(date: Date): string {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatShortCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)}jt`;
  }
  if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(0)}k`;
  }
  return `Rp ${amount}`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  return `${mins}m`;
}

// Get greeting based on time of day
export function getGreeting(): { greeting: string; emoji: string } {
  const hour = new Date().getHours();

  if (hour < 12) {
    return { greeting: "Selamat Pagi", emoji: "☀️" };
  }
  if (hour < 15) {
    return { greeting: "Selamat Siang", emoji: "🌤️" };
  }
  if (hour < 18) {
    return { greeting: "Selamat Sore", emoji: "🌅" };
  }
  return { greeting: "Selamat Malam", emoji: "🌙" };
}

// Get today's date string
export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

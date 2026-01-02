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

// Get current month string (YYYY-MM)
export function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Clamp a number between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Delay/sleep function
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if date is today
export function isToday(date: string | Date): boolean {
  const today = getTodayString();
  const checkDate = typeof date === "string" ? date : date.toISOString().split("T")[0];
  return today === checkDate;
}

// Get day name
export function getDayName(date: Date): string {
  return date.toLocaleDateString("id-ID", { weekday: "long" });
}

// Format relative time (e.g., "2 jam lalu")
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;
  return formatDate(date);
}


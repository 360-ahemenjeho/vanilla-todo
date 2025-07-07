export function formatHumanDate(input: string) {
  // Convert input to Date object
  const date = new Date(input);

  // Format components
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  const hour = date.getHours();
  const minute = date.getMinutes();

  // Add ordinal suffix to day
  const ordinalSuffix = (day: any) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Format time
  const formatTime = (hour: any, minute: any) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    if (minute === 0) {
      return `${displayHour}${period}`;
    } else {
      return `${displayHour}:${minute.toString().padStart(2, "0")}${period}`;
    }
  };

  return `${day}${ordinalSuffix(day)} ${month} ${year} ${formatTime(hour, minute)}`;
}

export function convertSeconds(seconds: number, unit: string): number {
  const conversions: Record<string, number> = {
    m: 60, // minutes
    h: 3600, // hours
    d: 86400, // days
    w: 604800, // weeks
    M: 2629746, // months (30.44 days avg)
    Y: 31557600, // years (365.25 days avg)
  };

  if (!conversions[unit]) {
    throw new Error(`Invalid unit: ${unit}. Use: m, h, d, w, M, Y`);
  }

  return seconds / conversions[unit];
}

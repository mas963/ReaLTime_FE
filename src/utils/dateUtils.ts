export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  const diffMinutes = Math.floor(diff / minute);
  const diffHours = Math.floor(diff / hour);
  const diffDays = Math.floor(diff / day);

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const isToday = today.getTime() === dateDay.getTime();
  const isYesterday = (today.getTime() - dateDay.getTime()) === day;

  if (diffMinutes < 1) {
    return "Now";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24 && isToday) {
    return `${diffHours}h ago`;
  } else if (isYesterday) {
    return "Yesterday";
  } else if (diffDays <= 7) {
    return `${diffDays}d ago`;
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
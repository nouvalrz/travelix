export const formatDateTime = (value: string): string => {
  const date = new Date(value);

  const formatted = new Intl.DateTimeFormat(navigator.language, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  return formatted;
};

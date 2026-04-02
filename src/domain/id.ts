export const createId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  const random = Math.random().toString(16).slice(2, 10);
  return `${Date.now().toString(16)}-${random}`;
};

type ClassValue = string | false | null | undefined | Record<string, boolean>;

export function cn(...inputs: ClassValue[]) {
  return inputs
    .flatMap((value) => {
      if (typeof value === "string") return value;
      if (value && typeof value === "object") {
        return Object.entries(value)
          .filter(([, enabled]) => enabled)
          .map(([name]) => name);
      }
      return [];
    })
    .join(" ");
}

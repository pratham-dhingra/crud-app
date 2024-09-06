export const objectLength = <T extends Record<PropertyKey, unknown>>(
  obj: T,
) => {
  return Object.keys(obj).length;
};

export const hasAnyEmpty = <T extends Record<PropertyKey, string>>(obj: T) => {
  for (const key of Object.keys(obj)) {
    if (obj[key].length == 0) {
      return true;
    }
  }
  return false;
};

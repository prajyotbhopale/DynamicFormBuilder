export const getExactWidth = (size: string) => {
  switch (size) {
    case "SMALL":
      return "33%";
    case "MEDIUM":
      return "50%";
    case "LARGE":
      return "66%";
    case "XL":
      return "100%";
    default:
      return "33%";
  }
};

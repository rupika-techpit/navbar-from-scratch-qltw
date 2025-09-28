// Convert hex to RGB
export const hexToRgb = (hex) => {
  const c = hex.replace("#", "");
  const bigint = parseInt(c, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

// Get brightness for contrast calculation
export const getBrightness = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000;
};

// Get proper text color based on brightness
export const getContrastText = (hex) =>
  getBrightness(hex) > 150 ? "#000000" : "#ffffff";

// Darken color
export const darkenColor = (hex, amount = 0.2) => {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.max(0, r - r * amount);
  const newG = Math.max(0, g - g * amount);
  const newB = Math.max(0, b - b * amount);
  return `rgb(${newR}, ${newG}, ${newB})`;
};

// Lighten color
export const lightenColor = (hex, amount = 0.2) => {
  const { r, g, b } = hexToRgb(hex);
  const newR = Math.min(255, r + (255 - r) * amount);
  const newG = Math.min(255, g + (255 - g) * amount);
  const newB = Math.min(255, b + (255 - b) * amount);
  return `rgb(${newR}, ${newG}, ${newB})`;
};

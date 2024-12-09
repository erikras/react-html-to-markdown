export type RGB = {
  red: number;
  green: number;
  blue: number;
};

export type HsxY = {
  hue: number;
  saturation: number;
  x: number;
  y: number;
};

export type HexColor = string;

function rgbToHsxY(rgb: RGB): HsxY {
  const { red, green, blue } = rgb;

  // Normalize RGB values to the range [0, 1]
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  // Find min and max RGB values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate Hue
  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  // Calculate Saturation
  const saturation = max === 0 ? 0 : delta / max;

  // Convert RGB to xy (CIE 1931 color space)
  const X = 0.4124 * r + 0.3576 * g + 0.1805 * b;
  const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const Z = 0.0193 * r + 0.1192 * g + 0.9505 * b;

  const sum = X + Y + Z;
  const x = sum === 0 ? 0.3127 : X / sum;
  const y = sum === 0 ? 0.3290 : Y / sum;

  return {
    hue,
    saturation: Math.round(saturation * 100), // percentage
    x: parseFloat(x.toFixed(4)),
    y: parseFloat(y.toFixed(4)),
  };
}

function hexToRGB(hex: HexColor): RGB {
  if (hex.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(hex)) {
    const red = parseInt(hex.slice(1, 3), 16);
    const green = parseInt(hex.slice(3, 5), 16);
    const blue = parseInt(hex.slice(5, 7), 16);

    return { red, green, blue };
  }

  throw new Error("Invalid hex color format. Ensure it's in the form '#RRGGBB'.");
}

export function convertToHsxY(color: RGB | HexColor | HsxY): HsxY {
  if (typeof color === 'string') {
    return convertToHsxY(hexToRGB(color));
  }
  if ('red' in color) {
    return rgbToHsxY(color);
  }
  return color;
}

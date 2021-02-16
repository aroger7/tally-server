export const getLinearGradientSteps = (color1, color2, steps) => {
  const colorSteps = getColorSteps(color1, color2, steps);
  return colorSteps
    .map((colorStep, i) => {
      const percentage = i / (colorSteps.length - 1) * 100;
      return `rgb(${colorStep.join(',')}) ${percentage.toFixed(2)}%`;
    })
    .join(',');
};

export const getColorSteps = (color1, color2, steps) => {
    const stepFactor = 1 / (steps - 1);
    const interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for(var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray;
};

export const interpolateColor = (color1, color2, factor) => {
  if (arguments.length < 3) { 
      factor = 0.5; 
  }
  var result = color1.slice();
  for (var i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
};

export const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const hexToRgbString = (hex) => {
  const rgb = hexToRgb(hex);
  return `${rgb.r},${rgb.g},${rgb.b}`;
}
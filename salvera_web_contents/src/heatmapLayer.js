const MIN_ZOOM_LEVEL = 11;
const MAX_ZOOM_LEVEL = 15;
export const heatmapLayer = {
  id: "heatmap",
  minzoom: MIN_ZOOM_LEVEL,
  maxzoom: MAX_ZOOM_LEVEL,
  type: "heatmap",
  paint: {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": ["interpolate", ["linear"], ["get", "bmi"], 10, 0, 50, 1],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      MIN_ZOOM_LEVEL,
      1,
      MAX_ZOOM_LEVEL,
      3,
    ],

    // Adjust the heatmap radius by zoom level, 6, 30
    "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      MIN_ZOOM_LEVEL,
      6,
      MAX_ZOOM_LEVEL,
      30,
    ],
  },
};

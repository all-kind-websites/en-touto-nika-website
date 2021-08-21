import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
let widthMultiplier = 1;
let textMultiplier = 1;
let iconMultiplier = 1;
let cardHeight = 1;
let cardWidth = 1;
let iconHeight = 1;
let iconWidth = 1;
console.log("============================");
console.log(
  Platform.OS,
  " width:",
  Math.floor(width),
  " height:",
  Math.floor(height)
);

if (Platform.OS === "ios") {
  if (width < 400) {
    cardHeight = 3;
    cardWidth = 1.2;
    iconHeight = 2.7;
    iconMultiplier = 3;
    iconWidth = 2;
    textMultiplier = 0.24;
    widthMultiplier = 0.3;
  }
  if (width > 400 && width < 500) {
    cardHeight = 2.5;
    cardWidth = 1.2;
    widthMultiplier = 0.3;
    textMultiplier = 0.28;
    iconMultiplier = 0.004 * height;
    iconHeight = 0.0028 * height;
    iconWidth = 1.5;
  }
  if (width > 500 && width < 700) {
    cardHeight = 5;
    cardWidth = 0.85;
    widthMultiplier = 0.3;
    textMultiplier = 0.22;
    iconMultiplier = 0.3 * height;
  }
  if (width > 700 && width < 900) {
    cardHeight = 0.65;
    cardWidth = 0.8;
    widthMultiplier = 0.2;
    textMultiplier = 0.4;
    iconMultiplier = 0.3 * height;
  }

  if (width > 900) {
    cardHeight = 1.5;
    cardWidth = 0.9;
    widthMultiplier = 0.2;
    textMultiplier = 0.4;
    iconMultiplier = 0.3 * height;
  }
} else {
  if (width < 500) {
    cardHeight = 3;
    cardWidth = 1.3;
    widthMultiplier = 0.3;
    textMultiplier = 0.28;
    iconMultiplier = 0.4 * height;
    iconHeight = 2;
    iconWidth = 1.7;
  }
  if (width > 500 && width < 700) {
    cardHeight = 3.5;
    cardWidth = 1.5;
    iconHeight = 3;
    iconMultiplier = 0.2 * height;
    iconWidth = 3;
    textMultiplier = 0.22;
    widthMultiplier = 0.3;
  }
  if (width > 700 && width < 900) {
    cardHeight = 0.65;
    cardWidth = 0.8;
    widthMultiplier = 0.2;
    textMultiplier = 0.4;
    iconMultiplier = 0.3 * height;
    iconHeight = 2;
    iconWidth = 1.7;
  }

  if (width > 900 && height > 1000) {
    cardHeight = 1.5;
    cardWidth = 0.9;
    widthMultiplier = 0.2;
    textMultiplier = 0.4;
    iconMultiplier = 0.3 * height;
    iconHeight = 2;
    iconWidth = 1.7;
  }
}

console.log("============================");

const DimensionsForStyle = {
  widthMultiplier,
  textMultiplier,
  iconMultiplier,
  cardHeight,
  cardWidth,
  iconHeight,
  iconWidth,
};

export default DimensionsForStyle;

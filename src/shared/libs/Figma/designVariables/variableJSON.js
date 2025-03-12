const fs = require("fs");
const path = require("path");

const cssToPascalCase = (css) => {
  return css.replace(/--([a-z0-9-]+)/g, (_, p1) => {
    return `--${p1
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-")}`;
  });
};

const convertThemeSelectors = (css) => {
  return css.replace(/\[data-theme="([A-Za-z0-9-]+)"\]/g, (_, p1) => {
    const theme = p1.toLowerCase();

    if (theme === "light") {
      return `:root, :root[data-theme][data-theme='${theme}']`;
    }

    if (theme === "default") {
      return `:root`;
    }

    return `:root[data-theme][data-theme='${theme}']`;
  });
};

const convertThemeSelectors2 = (css) => {
  return css.replace(/\[data-theme="([^"]+)"\]/g, (_, p1) => {
    return ":root";
  });
};

// Read the CSS file
const inputFilePath = path.join(__dirname, "adsRawVariable.css");
const outputFilePath = path.join(__dirname, "adsVariable.css");

fs.readFile(inputFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Convert CSS variable names to PascalCase
  let convertedCssString = cssToPascalCase(data);
  convertedCssString = convertThemeSelectors2(convertThemeSelectors(convertedCssString));

  // Write the converted CSS to a new file
  fs.writeFile(outputFilePath, convertedCssString, "utf8", (error) => {
    if (error) {
      console.error("Error writing the file:", error);
      return;
    }

    console.log("Converted CSS file has been saved to", outputFilePath);
  });
});

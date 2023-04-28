const fs = require("fs");
const path = require("path");

const pathToFile = path.resolve("src", "env.js");
const pathToEnvDevFile = path.resolve(".env.dev");
const pathToEnvProdFile = path.resolve(".env.prod");
const isDev = process.env.NODE_ENV === "development";

const readAndGetData = () => {
  try {
    const file = fs.readFileSync(isDev ? pathToEnvDevFile : pathToEnvProdFile, {
      encoding: "utf8",
    });
    const newFile = file
      .trim()
      .split("\n")
      .map((item) => `export const ${item}`)
      .join("\n");

    fs.writeFileSync(pathToFile, newFile);
  } catch (e) {
    console.log(e.message);
  }
};

const checkForEnvFile = () => {
  const exist = fs.existsSync(pathToFile);

  if (exist) {
    return readAndGetData();
  } else {
    fs.writeFileSync(pathToFile, "");
    return readAndGetData();
  }
};

module.exports = { checkForEnvFile };

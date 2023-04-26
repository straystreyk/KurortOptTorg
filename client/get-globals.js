const dotenv = require("dotenv");
dotenv.config();

const globals = {};

const getGlobals = () => {
  if (process.env.API_URL) globals.API_URL = process.env.API_URL;
  if (process.env.CLIENT_URL) globals.CLIENT_URL = process.env.CLIENT_URL;
  return globals;
};

module.exports = { getGlobals };

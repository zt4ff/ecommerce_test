// ./single.conf.js
require("dotenv").config();

exports.LT_USERNAME = process.env.LT_USERNAME;
exports.LT_ACCESS_KEY = process.env.LT_ACCESS_KEY;

exports.capabilities = {
  build: "[DEMO 1] ASSERT MODULE",
  name: "Your Test Name",
  platform: "Windows 10",
  browserName: "Chrome",
  version: "92.0",
  resolution: "1280x800",
  visual: false,
  network: false,
  console: false,
  tunnel: false,
};

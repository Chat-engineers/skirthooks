const livechatPreset = require("./livechat-tailwind-preset");

module.exports = {
  presets: [livechatPreset],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {},
  plugins: [],
};

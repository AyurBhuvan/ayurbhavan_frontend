import { nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|card|checkbox|divider|dropdown|image|input|modal|navbar|pagination|skeleton|spinner|tabs|popover|ripple|menu).js"
  ],
  theme: {
    extend: {

    },
  },
  plugins: [nextui()],
};
export default config;

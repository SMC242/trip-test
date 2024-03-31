// Read the colours from the Tailwind config
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const config = resolveConfig(tailwindConfig);
const colours = config.theme.colors;

if (colours === undefined)
  throw new Error("Brand colours not found in Tailwind config");

export default colours;

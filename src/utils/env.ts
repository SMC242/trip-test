import "dotenv/config";
import zod from "zod";

const Env = zod.object({
  BASE_URL: zod.string(),
  API_BASE_URL: zod.string(),
});

// Will panic if process.env does not match the schema.
// Better to panic early than way later
const env = Env.parse(process.env);

export default env;

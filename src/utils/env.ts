import "dotenv/config";
import zod from "zod";

const Env = zod.object({
  /**
   * The base URL of the website
   * @example http://localhost:3000
   */
  BASE_URL: zod.string(),
  /**
   * The base URL for the Ember REST API
   * @example https://api.ember.to/v1
   */
  API_BASE_URL: zod.string(),
});

// Will panic if process.env does not match the schema.
// Better to panic early than way later
const env = Env.parse(process.env);

export default env;

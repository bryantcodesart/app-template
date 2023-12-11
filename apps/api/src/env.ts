import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

export const ENV = validateEnvironmentVariables(
  z.object({
    HOST: z.string().default('localhost'),
    PORT: z.number().default(3000),
    PAYLOAD_SECRET: z.string(),
    DATABASE_URI: z.string(),
  })
);

export default ENV;

function validateEnvironmentVariables<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T
): z.infer<T> {
  try {
    return schema.parse(process.env);
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    if (error instanceof z.ZodError) {
      throw new Error(
        `Your environment variables are invalid. There was an issue with ${error.errors
          .map((e) => e.path.join('.'))
          .join(', ')}.`
      );
    }
    throw error;
  }
}

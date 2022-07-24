import * as dotenv from "dotenv";

dotenv.config();

const config = {
  SERVER_PORT: parseInt(String(process.env.SERVER_PORT), 10) || 8000,
  POSTGRES: {
    DB_NAME: process.env.DB_NAME || "api_bank",
    DB_PORT: parseInt(String(process.env.DB_PORT), 10) || 5432,
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST || "localhost",
  },
};

export { config };

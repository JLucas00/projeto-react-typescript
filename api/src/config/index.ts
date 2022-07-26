import * as dotenv from "dotenv";

dotenv.config();

const config = {
  SERVER_PORT: parseInt(String(process.env.SERVER_PORT), 10),
  POSTGRES: {
    DB_NAME: process.env.DB_NAME,
    DB_PORT: parseInt(String(process.env.DB_PORT), 10),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    CONNECTION_STRING: process.env.DB_URI,
  },
};

export { config };

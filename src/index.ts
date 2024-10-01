import dotenv from "dotenv";
import connectDB from "./infrastructure/config/database";

import { ExpressServer } from "./infrastructure/config/ExpressServer";

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  try {
    await connectDB();
    const app = new ExpressServer();
    app.start(PORT);
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();

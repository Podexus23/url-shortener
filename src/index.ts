import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

export async function main() {
  await connectDB();
  app.listen(3000);
  console.log(`Main is running on ${process.env.PORT}`);
}

await main();

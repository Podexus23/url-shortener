import 'dotenv/config';
import { connectDB } from './config/db.js';
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', () => {
  return { hello: 'data' };
});

export async function main() {
  console.log(`Main is running on ${process.env.PORT}`);
  await connectDB();
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

await main();

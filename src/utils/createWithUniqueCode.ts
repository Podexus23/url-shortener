import UrlModel from '../models/Url.js';

interface MongoError extends Error {
  code?: number;
  keyPattern?: Record<string, number>;
}

const MAX_RETRIES = 5;

export async function createWithUniqueCode(url: string, generate: () => string) {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await UrlModel.create({
        url,
        shortCode: generate(),
      });
    } catch (error) {
      const mongoError = error as MongoError;

      const isDuplicateShortCode = mongoError.code === 11000 && mongoError.keyPattern?.shortCode === 1;

      if (!isDuplicateShortCode) {
        throw error;
      }

      console.warn(`Short code collision, retrying (${attempt + 1}/${MAX_RETRIES})`);
    }
  }

  throw new Error('Failed to generate a unique short code after retries');
}

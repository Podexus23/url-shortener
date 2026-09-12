import { z } from 'zod/v4';

export const LinkBodySchema = z.object({
  url: z.httpUrl('Incorrect URL').max(2048, 'URL is too long'),
});

export type LinkBody = z.infer<typeof LinkBodySchema>;

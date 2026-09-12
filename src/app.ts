import express, { type Express, type Request, type Response } from 'express';
import Url from './models/Url.js';
import generateShortCode from './utils/generateShortCode.js';
import { validate } from './middleware/validate.js';
import { LinkBodySchema } from './schemas/url.js';
import { createWithUniqueCode } from './utils/createWithUniqueCode.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { asyncHandler } from './utils/asyncHandler.js';
import { NotFoundError } from './errors/AppError.js';

interface UrlQuery {
  url: string;
}

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ ok: true });
});

app.post(
  '/shorten',
  validate(LinkBodySchema, 'body'),
  asyncHandler(async (req: Request<object, object, UrlQuery>, res: Response) => {
    const { url } = req.body;
    const dbData = await createWithUniqueCode(url, generateShortCode);

    res.status(201).json(dbData);
  })
);

app.get(
  '/shorten/:code',
  asyncHandler(async (req: Request<{ code: string }>, res: Response) => {
    const { code } = req.params;

    const doc = await Url.findOneAndUpdate(
      { shortCode: code },
      { $inc: { accessCount: 1 } },
      { returnDocument: 'after' }
    );

    if (!doc) {
      throw new NotFoundError(`Short URL: ${code} not found`);
    }
    res.status(200).json(doc);
  })
);

app.put(
  '/shorten/:code',
  validate(LinkBodySchema, 'body'),
  asyncHandler(async (req: Request<{ code: string }, object, UrlQuery>, res: Response) => {
    const { code } = req.params;
    const { url } = req.body;

    const doc = await Url.findOneAndUpdate({ shortCode: code }, { $set: { url } }, { returnDocument: 'after' });

    if (!doc) {
      throw new NotFoundError(`Short URL: ${code} not found`);
    }

    res.status(200).json(doc);
  })
);

app.delete(
  '/shorten/:code',
  asyncHandler(async (req: Request<{ code: string }>, res: Response) => {
    const { code } = req.params;

    const deleted = await Url.findOneAndDelete({ shortCode: code });

    if (!deleted) {
      throw new NotFoundError(`Short URL: ${code} not found`);
    }

    res.status(204).end();
  })
);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;

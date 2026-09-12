import express, { type Express, type Request, type Response } from 'express';
import Url from './models/Url.js';
import generateShortCode from './utils/generateShortCode.js';
import { validate } from './middleware/validate.js';
import { LinkBodySchema } from './schemas/url.js';

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
  async (req: Request<object, object, UrlQuery>, res: Response) => {
    try {
      const { url } = req.body;
      const dbData = await Url.create({
        url,
        shortCode: generateShortCode(),
      });

      res.status(201).json(dbData);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
);

app.get('/shorten/:code', async (req: Request<{ code: string }>, res: Response) => {
  const { code } = req.params;

  const doc = await Url.findOneAndUpdate(
    { shortCode: code },
    { $inc: { accessCount: 1 } },
    { returnDocument: 'after' }
  );

  if (!doc) {
    res.status(404).json({ error: 'Short URL not found' });
    return;
  }
  res.status(200).json(doc);
});

app.put(
  '/shorten/:code',
  validate(LinkBodySchema, 'body'),
  async (req: Request<{ code: string }, object, UrlQuery>, res: Response) => {
    const { code } = req.params;
    const { url } = req.body;

    const doc = await Url.findOneAndUpdate({ shortCode: code }, { $set: { url } }, { returnDocument: 'after' });

    if (!doc) {
      res.status(404).json({ error: 'Short URL not found' });
      return;
    }

    res.status(200).json(doc);
  }
);

app.delete('/shorten/:code', async (req: Request<{ code: string }>, res: Response) => {
  const { code } = req.params;

  const deleted = await Url.findOneAndDelete({ shortCode: code });

  if (!deleted) {
    res.status(404).json({ error: 'Short URL not found' });
    return;
  }

  res.status(204).end();
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;

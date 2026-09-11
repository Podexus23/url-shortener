import express, { type Express, type Request, type Response } from 'express';
import Url from './models/Url.js';
import generateShortCode from './utils/generateShortCode.js';

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

app.post('/shorten', async (req: Request<object, object, UrlQuery>, res: Response) => {
  try {
    const longUrl = req.body.url;
    const url = await Url.create({
      url: longUrl,
      shortCode: generateShortCode(),
    });

    res.status(201).json(url);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get('/shorten/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  if (!code) {
    res.status(404).json({ error: 'Short URL not found' });
    return;
  }

  const doc = await Url.findOne({ shortCode: code });

  if (!doc) {
    res.status(404).json({ error: 'Short URL not found' });
    return;
  }
  res.status(200).json(doc);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;

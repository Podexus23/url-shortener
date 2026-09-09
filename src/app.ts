import express, { type Express, type Request, type Response } from 'express';

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

app.post('/shorten', (req: Request<object, object, UrlQuery>, res: Response) => {
  console.log(req.body.url);
  res.json({ ok: true });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;

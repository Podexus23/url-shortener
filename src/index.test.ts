import { hello } from './index.js';

describe('hello', () => {
  let logSpy;
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should says hello', () => {
    logSpy = vi.spyOn(console, 'log');

    hello();

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Hello'));
  });
});

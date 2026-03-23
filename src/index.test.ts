import { main } from './index.js';

describe('hello', () => {
  let logSpy;
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should says hello', () => {
    logSpy = vi.spyOn(console, 'log');

    main();

    expect(logSpy).toHaveBeenCalled();
  });
});

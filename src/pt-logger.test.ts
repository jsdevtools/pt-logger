import { test, expect, vi } from 'vitest';
import ptlogger from './pt-logger';

const logger = ptlogger({
  hostname: "localhost",
  program: "test",
  level: "info",
  remote: "false",
  host: "ignore",
  port: "ignore"
});

declare global {
  interface Console {
    _stdout: {
      write: (payload: any) => void
    }
  }
}

test('loggers gotta log', () => {
  const consoleLogSpy = vi.spyOn(console._stdout, 'write');
  logger.info(`something happened`);
  expect(consoleLogSpy).toHaveBeenCalled();
});
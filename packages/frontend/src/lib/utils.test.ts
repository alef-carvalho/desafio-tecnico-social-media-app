import { formatDate } from '@/lib/utils';

describe('formatDate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows "agora" for dates less than 1 minute ago', () => {
    const date = new Date('2024-01-15T11:59:30Z');
    expect(formatDate(date)).toBe('agora');
  });

  it('shows minutes for dates less than 1 hour ago', () => {
    const date = new Date('2024-01-15T11:30:00Z');
    expect(formatDate(date)).toBe('30m atrás');
  });

  it('shows hours for dates less than 24 hours ago', () => {
    const date = new Date('2024-01-15T08:00:00Z');
    expect(formatDate(date)).toBe('4h atrás');
  });

  it('shows days for dates less than 7 days ago', () => {
    const date = new Date('2024-01-13T12:00:00Z');
    expect(formatDate(date)).toBe('2d atrás');
  });

  it('shows formatted date for dates older than 7 days', () => {
    const date = new Date('2024-01-01T12:00:00Z');
    const result = formatDate(date);
    expect(result).toContain('jan');
    expect(result).toContain('2024');
  });
});

import { convertToRoute } from './convert-to-route';

describe('convertToRoute', () => {
  it ('convertToRoute normolize route', () => {
    expect(convertToRoute(['/', 'test', 123, 'test']))
      .withContext('convertToRoute should remove / in beginning')
      .toBe('test/123/test');
  });
});

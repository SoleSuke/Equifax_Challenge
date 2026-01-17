import { expect } from '@playwright/test';
import { BaseApiService } from './baseApi.service';

export class SerieCatalogService extends BaseApiService {

  async getCatalog(endpoint: string) {
    return this.get(endpoint);
  }

  async assertSuccess(response: any) {
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toEqual(expect.objectContaining({
      page: expect.any(Number),
      total_pages: expect.any(Number),
      total_results: expect.any(Number),
      results: expect.any(Array)
    }));

    expect(body.results.length).toBeGreaterThan(0);

    const serie = body.results[0];
    expect(serie).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      first_air_date: expect.any(String)
    }));
  }

    async assertUnauthorized(response: any) {
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.status_message).toContain('Invalid API key');
  }
}
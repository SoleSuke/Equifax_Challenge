import { expect } from '@playwright/test';
import { BaseApiService } from './baseApi.service';

export class SearchService extends BaseApiService {

  async search(endpoint: string, parameters?: { [key: string]: string|number|boolean; }|URLSearchParams|string) {
    return this.get(endpoint, parameters);
    //Check return status 200
    //Check response structure
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

    const resultSearch = body.results[0];
    expect(resultSearch).toEqual(expect.objectContaining({
      id: expect.any(Number)
    //  name: expect.any(String),
    //  first_air_date: expect.any(String)
    }));
  }

  async assertUnauthorized(response: any) {
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.status_message).toContain('Invalid API key');
  }

  async assertEmptySearch(response: any) {
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.results.length).toBe(0);
  }
}
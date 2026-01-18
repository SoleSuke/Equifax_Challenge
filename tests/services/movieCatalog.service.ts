import { TestInfo, expect, APIResponse } from '@playwright/test';
import { BaseApiService } from './baseApi.service';

export class MovieCatalogService extends BaseApiService {

  async getCatalog(endpoint: string) {
    return this.get(endpoint);
  }

  async assertSuccess(
    response: APIResponse,
    endpoint: string,
    testInfo: TestInfo
  ): Promise<void> {
    
    const body = await response.json();

    try {
      expect(response.status()).toBe(200);
    
      expect(body).toEqual(expect.objectContaining({
        page: expect.any(Number),
        total_pages: expect.any(Number),
        total_results: expect.any(Number),
        results: expect.any(Array)
      }));

      expect(body.results.length).toBeGreaterThan(0);

      const movie = body.results[0];
      expect(movie).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        release_date: expect.any(String)
      }));
    } catch (error: any) {
      await testInfo.attach('API Assertion Failure', {
        body: JSON.stringify(
          {
            endpoint,
            status: response.status(),
            responseBody: body
          },
          null,
          2
        ),
        contentType: 'application/json'
      });
      throw error;
    }
  }

  async assertUnauthorized(
    response: APIResponse,
    endpoint: string,
    testInfo: TestInfo
  ): Promise<void> {
    const body = await response.json();

    try {
      expect(response.status()).toBe(401);
    
      expect(body.status_message).toContain('Invalid API key');
    } catch (error: any) {
      await testInfo.attach('API Invalid API Key Assertion Failure', {
        body: JSON.stringify(
          {
            endpoint,
            status: response.status(),
            responseBody: body
          },
          null,
          2
        ),
        contentType: 'application/json'
      });
      throw error;
    }    
  }
}

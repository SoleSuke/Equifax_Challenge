import { TestInfo, expect, APIResponse } from '@playwright/test';
import { BaseApiService } from './baseApi.service';

export class SearchService extends BaseApiService {

  async search(endpoint: string, parameters?: { [key: string]: string|number|boolean; }|URLSearchParams|string) {
    return this.get(endpoint, parameters);
  }

  async assertSuccessSerie(
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

      const resultSearch = body.results[0];
      expect(resultSearch).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        overview: expect.any(String)
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

  async assertSuccessMovie(
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

      const resultSearch = body.results[0];
      expect(resultSearch).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        overview: expect.any(String)
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

  async assertSuccessPerson(
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

      const resultSearch = body.results[0];
      expect(resultSearch).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        popularity: expect.any(Number)
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
      await testInfo.attach('API Unauthorized Assertion Failure', {
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

  async assertEmptySearch(
    response: APIResponse,
    endpoint: string,
    testInfo: TestInfo
  ): Promise<void> {
    
    const body = await response.json();
    try {
      expect(response.status()).toBe(200);
          
      expect(body.results.length).toBe(0);
    } catch (error: any) {
      await testInfo.attach('API Empty Search Assertion Failure', {
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
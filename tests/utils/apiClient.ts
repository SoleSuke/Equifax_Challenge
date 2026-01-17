
import { request, APIRequestContext } from '@playwright/test';

export async function createApiContext(apiKey: string = ''): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: `${process.env.TMDB_BASE_URL}`,
    extraHTTPHeaders: {
      Authorization:`Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
  });
}
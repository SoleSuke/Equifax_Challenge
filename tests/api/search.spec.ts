import { test } from '@playwright/test';
import { createApiContext } from '../utils/apiClient';
import { SearchService } from '../services/search.service';

test.describe.configure({ mode: 'parallel' });

test (`Validate Search Movie in catalog`, async ({}, TestInfo) => {
  const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
    const service = new SearchService(api);
    const searchParams = new URLSearchParams();
    const endpoint = '/3/search/movie';
    searchParams.append('query', 'Inception');

    const response = await service.search(endpoint, searchParams);
    await service.assertSuccessMovie(response, endpoint, TestInfo);
});

test (`Validate Search Serie in catalog`, async ({}, TestInfo) => {
  const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
    const service = new SearchService(api);
    const searchParams = new URLSearchParams();
    const endpoint = '/3/search/tv';
    searchParams.append('query','Friends');
    searchParams.append('page', '1');

    const response = await service.search(endpoint, searchParams);
    await service.assertSuccessSerie(response, endpoint, TestInfo);
});

test (`Validate Search Person in catalog`, async ({}, TestInfo) => {
  const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
    const service = new SearchService(api);
    const searchParams = new URLSearchParams();
    const endpoint = '/3/search/person';
    searchParams.append('query','Britney');
    searchParams.append('query','Spears');

    const response = await service.search(endpoint, searchParams);
    await service.assertSuccessPerson(response, endpoint, TestInfo);
});

test('Unauthorized Search request should return 401', async ({}, TestInfo) => {
  const api = await createApiContext(`${process.env.TMDB_BAD_API_KEY}`);
  const service = new SearchService(api);
  const searchParams = new URLSearchParams();
  const endpoint = '/3/search/movie'; 
  searchParams.append('query', 'Titanic');

  const response = await service.search(endpoint, searchParams)
  await service.assertUnauthorized(response, endpoint, TestInfo);
});

test('Empty Search request should return 200 and no results', async ({}, TestInfo) => {
  const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
  const service = new SearchService(api);
  const searchParams = new URLSearchParams();
  const endpoint = '/3/search/tv';
  searchParams.append('query', '');

  const response = await service.search(endpoint, searchParams)
  await service.assertEmptySearch(response, endpoint, TestInfo);
});

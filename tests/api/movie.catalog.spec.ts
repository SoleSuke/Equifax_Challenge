
import { test } from '@playwright/test';
import { createApiContext } from '../utils/apiClient';
import { MovieCatalogService } from '../services/movieCatalog.service';

test.describe.configure({ mode: 'parallel' });

const catalogs = [
  { name: 'Top Rated', path: '/3/movie/top_rated' },
  { name: 'Popular', path: '/3/movie/popular' },
  { name: 'Now Playing', path: '/3/movie/now_playing' },
  { name: 'Upcoming', path: '/3/movie/upcoming' }
];

for (const catalog of catalogs) {
  test(`Validate ${catalog.name} catalog`, async ({}, TestInfo) => {
    const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
    const service = new MovieCatalogService(api);

    const response = await service.getCatalog(catalog.path);
    await service.assertSuccess(response, catalog.path, TestInfo);
  });
}

test('Unauthorized request should return 401', async ({}, TestInfo) => {
  const api = await createApiContext(`${process.env.TMDB_BAD_API_KEY}`);
  const service = new MovieCatalogService(api);
  const endpoint = '/3/movie/popular';

  const response = await service.getCatalog(endpoint);
  await service.assertUnauthorized(response, endpoint, TestInfo);
});

test('Unauthorized (Invalid Characters API_KEY) request should return 401', async ({}, TestInfo) => {
  const api = await createApiContext(`${process.env.TMDB_NO_API_KEY}`);
  const service = new MovieCatalogService(api);
  const endpoint = '/3/movie/now_playing';

  const response = await service.getCatalog(endpoint);
  await service.assertUnauthorized(response, endpoint, TestInfo);
});

test('Unauthorized (Empty API_KEY) request should return 401', async ({}, TestInfo) => {
  const api = await createApiContext();
  const service = new MovieCatalogService(api);
  const endpoint = '/3/movie/top_rated';

  const response = await service.getCatalog(endpoint);
  await service.assertUnauthorized(response, endpoint, TestInfo);
});

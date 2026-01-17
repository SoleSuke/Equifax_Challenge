import { test } from '@playwright/test';
import { createApiContext } from '../utils/apiClient';
import { SerieCatalogService } from '../services/serieCatalog.service';

test.describe.configure({ mode: 'parallel' });

const catalogs = [
  { name: 'Top Rated', path: '/3/tv/top_rated' },
  { name: 'Popular', path: '/3/tv/popular' },
  { name: 'Airing Today', path: '/3/tv/airing_today' },
  { name: 'On the Air', path: '/3/tv/on_the_air' }
];

for (const catalog of catalogs) {
  test(`Validate ${catalog.name} catalog`, async () => {
    const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
    const service = new SerieCatalogService(api);
    
    const response = await service.getCatalog(catalog.path);
    await service.assertSuccess(response);
  });
}

test('Unauthorized request should return 401', async () => {
  const api = await createApiContext(`${process.env.TMDB_BAD_API_KEY}`);
  const service = new SerieCatalogService(api);

  const response = await service.getCatalog('/3/tv/airing_today');
  await service.assertUnauthorized(response);
});

test('Unauthorized (Invalid Characters API_KEY) request should return 401', async () => {
  const api = await createApiContext(`${process.env.TMDB_NO_API_KEY}`);
  const service = new SerieCatalogService(api);

  const response = await service.getCatalog('/3/tv/on_the_air');
  await service.assertUnauthorized(response);
});

test('Unauthorized (Empty API_KEY) request should return 401', async () => {
  const api = await createApiContext();
  const service = new SerieCatalogService(api);

  const response = await service.getCatalog('/3/tv/on_the_air');
  await service.assertUnauthorized(response);
});
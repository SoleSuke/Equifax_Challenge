import { test } from '@playwright/test';
import { createApiContext } from '../utils/apiClient';
import { SearchService } from '../services/search.service';

test.describe.configure({ mode: 'parallel' });

const catalogs = [
  { name: 'Movie', path: '/3/search/movie' },
  { name: 'Serie', path: '/3/search/tv' },
  { name: 'Person', path: '/3/search/person' }
];

for (const catalog of catalogs) {
  test(`Validate Search ${catalog.name} in catalog`, async () => {
    const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
    const service = new SearchService(api);
    const searchParams = new URLSearchParams();

    if (catalog.name === 'Movie') {
      searchParams.append('query', 'Inception');
    } else if (catalog.name === 'Serie') {
      searchParams.append('query','Friends');
    } else if (catalog.name === 'Person') {
      searchParams.append('query','Britney');
    } else {
      console.log('Out of Catalogue for Search');
    }
    const response = await service.search(catalog.path, searchParams);
    //searchParams.append('query', 'Inception');
    //const response = await service.getCatalog(catalog.path);
    await service.assertSuccess(response);
  });
}

test('Unauthorized Search request should return 401', async () => {
  const api = await createApiContext(`${process.env.TMDB_BAD_API_KEY}`);
  const service = new SearchService(api);
  const searchParams = new URLSearchParams();
  
  searchParams.append('query', 'Titanic');

  const response = await service.search('/3/search/movie', searchParams)

  await service.assertUnauthorized(response);
});

test('Empty Search request should return 200 and no results', async () => {
  const api = await createApiContext(`${process.env.TMDB_ACCESS_TOKEN}`);
  const service = new SearchService(api);
  const searchParams = new URLSearchParams();
  
  searchParams.append('query', '');

  const response = await service.search('/3/search/tv', searchParams)

  await service.assertEmptySearch(response);
});

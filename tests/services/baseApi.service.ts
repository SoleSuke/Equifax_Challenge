
import { APIRequestContext } from '@playwright/test';

export abstract class BaseApiService {
  constructor(protected api: APIRequestContext) {}

  protected async get(url: string, parameters?: URLSearchParams) {
    return this.api.get(url, {params: parameters}
    );
  }
}

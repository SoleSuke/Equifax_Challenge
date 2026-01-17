
import { APIRequestContext } from '@playwright/test';

export abstract class BaseApiService {
  constructor(protected api: APIRequestContext) {}

  protected async get(url: string) {
    return this.api.get(url);
  }
}

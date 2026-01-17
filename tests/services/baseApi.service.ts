
import { APIRequestContext } from '@playwright/test';

export abstract class BaseApiService {
  constructor(protected api: APIRequestContext) {}

  protected async get(url: string, parameters?: { [key: string]: string|number|boolean; }|URLSearchParams|string) {
    return this.api.get(url, {params: parameters}
    );
  }
}

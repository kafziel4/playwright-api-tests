import { test as base } from '@playwright/test';
import { ReqResRequests } from '../requests/reqres-requests';

export const test = base.extend<{ reqResRequests: ReqResRequests }>({
  reqResRequests: async ({ request }, use) => {
    await use(new ReqResRequests(request));
  },
});

export { expect } from '@playwright/test';

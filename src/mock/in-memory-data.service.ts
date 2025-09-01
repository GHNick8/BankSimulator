import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { ACCOUNTS, TRANSACTIONS } from './mock-db';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { accounts: ACCOUNTS, transactions: TRANSACTIONS };
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'bootstrap') {
      return reqInfo.utils.createResponse$(() => ({
        body: { accounts: ACCOUNTS, transactions: TRANSACTIONS },
        status: 200
      }));
    }
    return undefined;
  }
}

import { v4 as uuid } from 'uuid';
import { addDays, subDays } from 'date-fns';

const acc1 = { id: uuid(), name: '0000 0000 0000', iban: 'BE68 5390 0754 7034', balance: 2450.23 };
const acc2 = { id: uuid(), name: 'Savings',  iban: 'BE12 3456 7890 1234', balance: 8200.00 };
const acc3 = { id: uuid(), name: 'Travel',   iban: 'BE98 7654 3210 9876', balance: 530.55 };

export const ACCOUNTS = [acc1, acc2, acc3];

export const TRANSACTIONS = [
  { id: uuid(), accountId: acc1.id, amount: 1200, type: 'CREDIT', memo: 'Salary', createdAt: subDays(new Date(), 2).toISOString() },
  { id: uuid(), accountId: acc1.id, amount: 49.99, type: 'DEBIT', memo: 'Groceries', createdAt: subDays(new Date(), 1).toISOString() },
  { id: uuid(), accountId: acc2.id, amount: 300, type: 'CREDIT', memo: 'Interest', createdAt: addDays(new Date(), -10).toISOString() },
  { id: uuid(), accountId: acc3.id, amount: 200, type: 'DEBIT', memo: 'Hotel', createdAt: addDays(new Date(), -5).toISOString() }
];

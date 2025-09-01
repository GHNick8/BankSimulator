import { Injectable, computed, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { AuthService } from './auth.service'; 

export type Account = { id: string; userId: string; name: string; iban: string; balance: number };
export type Transaction = { id: string; accountId: string; amount: number; type: 'DEBIT'|'CREDIT'; memo?: string; createdAt: string };

@Injectable({ providedIn: 'root' })
export class BankStore {
  private accountsSig = signal<Account[]>([]);
  private txSig = signal<Transaction[]>([]);

  accounts = this.accountsSig.asReadonly();
  transactions = this.txSig.asReadonly();

  totalBalance = computed(() =>
    this.accountsSig().reduce((s, a) => s + a.balance, 0)
  );

  constructor(private auth: AuthService) {}

  // Load existing accounts and transactions
  load(accounts: Account[], txs: Transaction[]) {
    this.accountsSig.set(accounts);
    this.txSig.set(txs);
  }

  // Create account tied to current user
  createAccount(name: string, iban: string, balance = 0) {
    const userId = this.auth.user()?.id;
    if (!userId) throw new Error('User not logged in');

    const acc: Account = { id: uuid(), userId, name, iban, balance };
    this.accountsSig.set([acc, ...this.accountsSig()]);
    return acc;
  }

  // Get accounts belonging to current user
  accountsForCurrentUser() {
    const userId = this.auth.user()?.id;
    return this.accountsSig().filter(a => a.userId === userId);
  }

  transfer(fromId: string, toId: string, amount: number, memo?: string) {
    if (amount <= 0) throw new Error('Amount must be positive');
    const from = this.accountsSig().find(a => a.id === fromId);
    const to = this.accountsSig().find(a => a.id === toId);
    if (!from || !to) throw new Error('Invalid accounts');
    if (from.balance < amount) throw new Error('Insufficient funds');

    from.balance -= amount;
    to.balance += amount;
    const now = new Date().toISOString();

    const debit: Transaction = { id: uuid(), accountId: from.id, amount, type: 'DEBIT', memo, createdAt: now };
    const credit: Transaction = { id: uuid(), accountId: to.id, amount, type: 'CREDIT', memo, createdAt: now };

    this.txSig.set([debit, credit, ...this.txSig()]);
    this.accountsSig.set([...this.accountsSig()]);
  }

  // Filtering helper
  filteredTransactions({ type, from, to }: { type?: 'DEBIT'|'CREDIT'|'ALL', from?: string, to?: string }) {
    let list = this.txSig();
    if (type && type !== 'ALL') list = list.filter(t => t.type === type);
    if (from) list = list.filter(t => new Date(t.createdAt) >= new Date(from));
    if (to) list = list.filter(t => new Date(t.createdAt) <= new Date(to));
    return list;
  }
}

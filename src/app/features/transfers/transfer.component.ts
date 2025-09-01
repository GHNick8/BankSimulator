import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankStore } from '../../core/services/bank.store';
import { CardComponent } from '../../shared/components/card/card.component';
import { MoneyPipe } from '../../shared/components/money/money.pipe';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, MoneyPipe],
  template: `
    <app-card title="Make a Transfer">
      <form (ngSubmit)="submit()" #f="ngForm" class="transfer-form">
        <label>
          From
          <select name="from" [(ngModel)]="fromId" required>
            <option *ngFor="let a of userAccounts" [value]="a.id">{{ a.name }} ({{ a.balance | money }})</option>
          </select>
        </label>
        <label>
          To
          <select name="to" [(ngModel)]="toId" required>
            <option *ngFor="let a of userAccounts" [value]="a.id">{{ a.name }}</option>
          </select>
        </label>
        <label>
          Amount
          <input type="number" name="amount" [(ngModel)]="amount" min="0.01" step="0.01" required />
        </label>
        <label>
          Memo
          <input name="memo" [(ngModel)]="memo" />
        </label>
        <button type="submit" [disabled]="f.invalid">Transfer</button>
      </form>
    </app-card>
  `,
  styles: [`
    .transfer-form {
      display: grid;
      gap: 1rem;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: 500;
      color: var(--text);
    }

    select, input {
      margin-top: 0.25rem;
      padding: 0.5rem;
      border-radius: 8px;
      border: 1px solid #cbd5e1; 
      background: #ffffff;
      color: var(--text);
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    select:focus, input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px #2563EB33; 
    }

    button {
      background: var(--card); 
      color: var(--primary);
      border: 1px solid transparent;
      border-radius: 14px;
      padding: 0.6rem 1rem;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s, color 0.2s;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px #000000;
      color: #1e3a8a;
    }
  `]
})
export class TransferComponent {
  store = inject(BankStore);

  get userAccounts() {
    return this.store.accountsForCurrentUser();
  }

  fromId!: string;
  toId!: string;
  amount!: number;
  memo?: string;

  submit() {
    this.store.transfer(this.fromId, this.toId, this.amount, this.memo);
    alert('Transfer complete');
  }
}

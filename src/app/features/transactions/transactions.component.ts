import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../../shared/components/card/card.component';
import { MoneyPipe } from '../../shared/components/money/money.pipe';
import { BankStore } from '../../core/services/bank.store';
import { AuthService } from '../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe, CardComponent, MoneyPipe],
  template: `
    <app-card title="Recent Transactions">
      <form class="filters" (submit)="$event.preventDefault()">
        <label>
          Type:
          <select [(ngModel)]="type" name="type">
            <option value="ALL">All</option>
            <option value="DEBIT">Debit</option>
            <option value="CREDIT">Credit</option>
          </select>
        </label>
        <label>
          From:
          <input type="date" [(ngModel)]="from" name="from" />
        </label>
        <label>
          To:
          <input type="date" [(ngModel)]="to" name="to" />
        </label>
        <button type="button" (click)="apply()">Apply</button>
      </form>

      <div *ngFor="let t of filtered()" class="row">
        <div>{{ t.type }}</div>
        <div class="muted">{{ t.createdAt | date:'short' }}</div>
        <div [class.debit]="t.type==='DEBIT'" [class.credit]="t.type==='CREDIT'">{{ t.amount | money }}</div>
      </div>
    </app-card>
  `,
  styles: [`
    .filters {
      display: flex;
      gap: .75rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
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
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s, color 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px #000000;
      color: #1e3a8a;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .row {
      display: grid;
      grid-template-columns: 100px 1fr 140px;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e2e8f0; 
    }

    .debit { color: #dc2626; }  
    .credit { color: #15803d; }
    .muted { opacity: 0.7; color: var(--muted); }
  `]
})
export class TransactionsComponent {
  private store = inject(BankStore);
  private auth = inject(AuthService);

  type: 'DEBIT'|'CREDIT'|'ALL' = 'ALL';
  from?: string;
  to?: string;

  apply() {}

  filtered() {
    const userAccountIds = this.store.accountsForCurrentUser().map(a => a.id);
    return this.store.filteredTransactions({ type: this.type, from: this.from, to: this.to })
      .filter(t => userAccountIds.includes(t.accountId));
  }
}

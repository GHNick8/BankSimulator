import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { MoneyPipe } from '../../shared/components/money/money.pipe';
import { BankStore } from '../../core/services/bank.store';
import { ApiService } from '../../core/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, CardComponent, MoneyPipe],
  template: `
    <h2>Overview</h2>

    <app-card title="Total Balance">
      <div class="big">{{ store.totalBalance() | money }}</div>
    </app-card>

    <app-card title="Accounts">
      <div *ngFor="let a of store.accounts()" class="row">
        <div>{{ a.name }} ({{ a.iban }})</div>
        <div>{{ a.balance | money }}</div>
      </div>
    </app-card>
  `,
  styles: [`
    h2 {
      font-size: 1.75rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: var(--text);
    }

    .row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e2e8f0; 
      color: var(--text);
    }

    .row:last-child {
      border-bottom: none;
    }

    .big {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary); 
    }
  `]
})
export class DashboardComponent {
  store = inject(BankStore);
  private api = inject(ApiService);

  constructor(){
    effect(() => {
      this.api.get(`/bootstrap`).subscribe((res: any) => {
        this.store.load(res.accounts, res.transactions);
      });
    });
  }
}

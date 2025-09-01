import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { MoneyPipe } from '../../shared/components/money/money.pipe';
import { BankStore } from '../../core/services/bank.store';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, CardComponent, MoneyPipe],
  template: `
    <app-card title="Accounts">
      <ng-container *ngIf="accounts.length > 0; else noAccounts">
        <a *ngFor="let a of accounts" [routerLink]="['/accounts', a.id]" class="row">
          <div>
            <div class="name">{{ a.name }}</div>
            <div class="muted">{{ a.iban }}</div>
          </div>
          <div class="bal">{{ a.balance | money }}</div>
        </a>
      </ng-container>
      <ng-template #noAccounts>
        <p class="no-accounts">You have no accounts yet.</p>
      </ng-template>
    </app-card>
  `,
  styles: [`
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: .6rem;
      border-radius: 10px;
      text-decoration: none;
      color: var(--text);
      transition: background 0.2s;
    }

    .row:hover {
      background: var(--card); 
    }

    .name {
      font-weight: 600;
    }

    .muted {
      opacity: 0.7;
      font-size: 0.9rem;
      color: var(--muted);
    }

    .bal {
      font-weight: 600;
      color: var(--primary); 
    }

    .no-accounts {
      color: var(--muted);
      font-style: italic;
      padding: 0.5rem 0;
    }
  `]
})
export class AccountsComponent {
  private store = inject(BankStore);

  // Only accounts belonging to the logged-in user
  get accounts() {
    return this.store.accountsForCurrentUser();
  }
}

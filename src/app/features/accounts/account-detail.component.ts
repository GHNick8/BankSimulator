import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { MoneyPipe } from '../../shared/components/money/money.pipe';
import { BankStore } from '../../core/services/bank.store';

@Component({
  standalone: true,
  imports: [CardComponent, MoneyPipe],
  template: `
    <app-card [title]="account()?.name">
      <div>IBAN: {{ account()?.iban }}</div>
      <div>Balance: {{ account()?.balance ?? 0 | money }}</div>
    </app-card>
  `
})
export class AccountDetailComponent {
  private route = inject(ActivatedRoute);
  private store = inject(BankStore);

  account = computed(() => this.store.accounts().find(a => a.id === this.route.snapshot.params['id']));
}

import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { BankStore } from '../../core/services/bank.store';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, CardComponent],
  template: `
    <app-card title="Login">
      <form (ngSubmit)="submit(f)" #f="ngForm" class="login-form">
        <label>
          Email
          <input name="email" ngModel required />
        </label>
        <label>
          Password
          <input name="password" type="password" ngModel required />
        </label>

        <button type="submit" [disabled]="f.invalid">Sign in</button>
      </form>
    </app-card>
  `,
  styles: [`
    .login-form {
      display: grid;
      gap: .75rem;
      max-width: 360px;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: 500;
      color: var(--text);
      max-width: 300px;
    }

    input {
      margin-top: 0.25rem;
      padding: .5rem .6rem;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: var(--text);
      font-size: 1rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px #2563EB33; 
    }

    button {
      margin-top: .5rem;
      padding: .5rem .8rem;
      border-radius: 14px;
      border: 1px solid transparent;
      background: var(--card);
      color: var(--primary);
      font-weight: 600;
      cursor: pointer;
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
export class LoginComponent {
  private router = inject(Router);
  private auth = inject(AuthService);
  private bank = inject(BankStore);

  submit(form?: any) {
    const email = form?.value?.email;
    const password = form?.value?.password;

    // Simulate login with token & user
    const userId = email || 'u1';
    const name = 'Demo User';
    this.auth.login('demo-token-' + userId, { id: userId, name });

    // Create a default account if none exists
    if (this.bank.accountsForCurrentUser().length === 0) {
      this.bank.createAccount('0000 0000 0000', 'DEMO-IBAN-001', 1000);
    }

    // Navigate to dashboard
    this.router.navigateByUrl('/dashboard');
  }
}

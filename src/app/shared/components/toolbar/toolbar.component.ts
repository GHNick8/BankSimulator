import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="toolbar">
      <a routerLink="/dashboard" class="brand">Bank Simulator</a>

      <div class="nav-actions">
        <div class="links">
          <a routerLink="/accounts">Accounts</a>
          <a routerLink="/transfers">Transfers</a>
          <a routerLink="/transactions">Transactions</a>
        </div>

        <div class="actions">
          <ng-container *ngIf="auth.isLoggedIn(); else loggedOut">
            <span class="welcome">Welcome, {{ auth.user()?.name }}</span>
            <button (click)="auth.logout()">Logout</button>
          </ng-container>

          <ng-template #loggedOut>
            <a routerLink="/auth/login">Login</a> | 
            <a routerLink="/auth/register">Register</a>
          </ng-template>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .75rem 1rem;
      background: var(--primary);
      color: #ffffff;
      flex-wrap: wrap;
    }

    .brand {
      font-weight: 700;
      font-size: 1.5rem;
      color: #ffffff;
      text-decoration: none;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 2rem; 
    }

    .links {
      display: flex;
      gap: 1rem;
    }

    .links a {
      color: #ffffff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .links a:hover {
      color: #1e3a8a;
    }

    .actions {
      display: flex;
      gap: .75rem;
      align-items: center;
    }

    .welcome {
      font-weight: 500;
      margin-right: .5rem;
    }

    .actions a {
      color: #ffffff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }

    .actions a:hover {
      color: #1e3a8a;
    }

    button {
      background: var(--card);
      color: var(--primary);
      border: 1px solid transparent;
      border-radius: 14px;
      padding: .4rem .8rem;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s, color 0.2s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px #000000;
      color: #1e3a8a;
    }

    @media (max-width: 768px) {
      .nav-actions {
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
      }
      .links {
        justify-content: flex-end;
      }
    }
  `]
})
export class ToolbarComponent {
  auth = inject(AuthService);
}

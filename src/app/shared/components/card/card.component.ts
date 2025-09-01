import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="card">
      <header *ngIf="title" class="card__header">{{ title }}</header>
      <div class="card__content"><ng-content /></div>
    </section>
  `,
  styles: [`
    .card {
      background: var(--card); 
      border-radius: 14px;
      padding: 1rem;
      box-shadow: 0 8px 20px #000000;
      margin: .5rem 0;
      margin-top: 40px;
      margin-left: 25px;
      transition: transform 0.2s, box-shadow 0.2s;
      max-width: 360px;
    }

    .card:hover {
      transform: translateY(-2px); 
      box-shadow: 0 12px 24px #000000;
    }

    .card__header {
      font-weight: 700;
      font-size: 1.25rem;
      margin-bottom: 1.25rem;
      color: var(--text); 
    }

    .card__content {
      color: var(--text);
      line-height: 1.6;
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
}

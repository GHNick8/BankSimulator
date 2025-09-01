import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent],
  template: `
    <app-toolbar></app-toolbar>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host { display:block; min-height:100vh; }
  `]
})
export class AppComponent {}

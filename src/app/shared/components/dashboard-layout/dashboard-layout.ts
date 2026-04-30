import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <nav class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex items-center space-x-2 group">
          <span class="text-2xl group-hover:scale-110 transition-transform">🥘</span>
          <h1 class="font-extrabold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Smart Recipe Box
          </h1>
        </a>

        <!-- Menú -->
        <div class="flex items-center space-x-8">
          <a routerLink="/" 
             routerLinkActive="text-amber-600 border-b-2 border-amber-600"
             [routerLinkActiveOptions]="{exact: true}"
             class="font-bold text-gray-600 hover:text-amber-600 py-5 transition-colors">
            Explorar
          </a>
          <a routerLink="/add" 
             routerLinkActive="text-amber-600 border-b-2 border-amber-600"
             class="font-bold text-gray-600 hover:text-amber-600 py-5 transition-colors">
            Añadir Receta
          </a>
          
          <button (click)="logout()" 
                  class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold transition-all">
            Salir 🚪
          </button>
        </div>
      </nav>
    </header>

    <main class="min-h-[calc(100vh-64px)] bg-gray-50">
      <router-outlet />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}

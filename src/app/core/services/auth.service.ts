import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  
  // Lista de usuarios válidos para la simulación
  private readonly VALID_USERS = [
    { username: 'admin', password: 'password123' },
    { username: 'chef', password: 'cooking2024' },
    { username: 'tutor', password: 'angularv19' }
  ];

  // Signal para rastrear el estado de autenticación
  isLoggedIn = signal<boolean>(!!localStorage.getItem('auth_token'));

  /**
   * Valida las credenciales y realiza el login
   */
  login(username: string, password: string): boolean {
    const user = this.VALID_USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('auth_token', 'simulated-jwt-token');
      this.isLoggedIn.set(true);
      this.router.navigate(['/']);
      return true;
    }

    return false;
  }

  /**
   * Cierra la sesión
   */
  logout() {
    localStorage.removeItem('auth_token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}

import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  // Signal para manejar mensajes de error
  errorMessage = signal<string | null>(null);

  // Definición del formulario
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    
    // Intentamos hacer login
    const success = this.authService.login(username!, password!);

    if (!success) {
      this.errorMessage.set('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    } else {
      this.errorMessage.set(null);
    }
  }

  /**
   * Helper para mostrar errores en el HTML
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }
}

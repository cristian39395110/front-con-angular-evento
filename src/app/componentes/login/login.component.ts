import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Validación adicional antes de enviar
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Por favor, ingresa un correo válido.';
      return;
    }

    // Credenciales
    const credentials = { email: this.email.trim(), password: this.password.trim() };
    this.authService.login(credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/eventos']);
      },
      (error) => {
        this.errorMessage = 'Credenciales incorrectas. Intenta nuevamente.';
      }
    );
  }
}

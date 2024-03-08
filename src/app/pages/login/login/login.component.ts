

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { TokenService } from '../../../services/token.service';


type LoginResponse = string | { token: string };

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private tokenService:TokenService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: (response: LoginResponse) => {
          if (typeof response === 'string') {
            // Check if the response contains the word "wrong"
            if (response.toLowerCase().includes('wrong')) {
              // Set the login error message
              this.loginError = response;
            } else {
              // Navigate to the dashboard
              this.router.navigate(['dashboard']);
              this.tokenService.setToken(response);
            }
          } else {
            // It's a token
            this.router.navigate(['dashboard']);
          }
        },
        error: (error) => {
          // Handle other errors if necessary
          console.error('Login error:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRegister(){
    this.router.navigate(['registration']);
  }
}

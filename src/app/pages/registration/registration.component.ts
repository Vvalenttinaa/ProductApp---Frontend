import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'; 
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm!: FormGroup;
  registrationSuccess: boolean = false;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.onRegister(this.registerForm.value).subscribe({
        next: (response) => {
          this.registrationSuccess = true;
          this.authService.registrationSuccess$.emit(true);
          this.message = 'Registration successful!';
          
        },
        error: (error) => {
          console.error('Registration error:', error);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onLogin(){
    this.router.navigate(['dashboard']);
  }
}

import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuthenticated$;

  constructor(private tokenService: TokenService, private authService:AuthService, private router:Router){
    this.isAuthenticated$ = this.tokenService.isAuthentication;
  }

  onArticles(){
    this.router.navigate(['articles']);
  }

  onLogout(){

    this.authService.onLogout();
    this.router.navigate(['']);
  }

  onAttributes(){
    this.router.navigate(['dashboard']);
  }
}

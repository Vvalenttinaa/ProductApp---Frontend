import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { guestGuard } from './guards/guest.guard';
import { authGuard } from './guards/auth.guard';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ArticlesComponent } from './components/articles/articles.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate:[guestGuard]},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    { path: 'registration', component: RegistrationComponent },
    { path: 'articles', component: ArticlesComponent, canActivate:[authGuard]}
];

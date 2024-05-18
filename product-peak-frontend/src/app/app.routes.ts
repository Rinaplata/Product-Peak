import { Routes } from '@angular/router';


export const routes: Routes = [
  {
      path: '',
      loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),

  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
  }

];


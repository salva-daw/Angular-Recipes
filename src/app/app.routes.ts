import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shared/components/dashboard-layout/dashboard-layout').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/recipe-list/recipe-list').then(m => m.RecipeListComponent)
      },
      {
        path: 'recipe/:id',
        loadComponent: () => import('./features/recipe-detail/recipe-detail').then(m => m.RecipeDetailComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./features/recipe-form/recipe-form').then(m => m.RecipeFormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./features/recipe-form/recipe-form').then(m => m.RecipeFormComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

import { Routes } from '@angular/router';
import { RecipeListComponent } from './features/recipe-list/recipe-list';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail';

export const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    title: 'Recetario - Listado'
  },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent,
    title: 'Detalle de Receta'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

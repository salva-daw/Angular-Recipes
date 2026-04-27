import { Routes } from '@angular/router';
import { RecipeListComponent } from './features/recipe-list/recipe-list';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail';
import { RecipeFormComponent } from './features/recipe-form/recipe-form';

export const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    title: 'Recetario - Listado'
  },
  {
    path: 'add',
    component: RecipeFormComponent,
    title: 'Añadir Receta'
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

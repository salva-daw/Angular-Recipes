import { Component, signal, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeListComponent } from './features/recipe-list/recipe-list';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail';
import { RecipeService } from './core/services/recipe.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeListComponent, RecipeDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private recipeService = inject(RecipeService);
  protected readonly title = signal('Smart Recipe Box');
  
  // Obtenemos la primera receta como ejemplo para el Paso 6
  protected firstRecipe = computed(() => this.recipeService.recipes()[0]);
}

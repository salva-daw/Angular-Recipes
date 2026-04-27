import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecipeListComponent } from './features/recipe-list/recipe-list';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail';
import { RecipeService } from './core/services/recipe.service';
import { Recipe } from './core/models/recipe.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeListComponent, RecipeDetailComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private recipeService = inject(RecipeService);
  protected readonly title = signal('Smart Recipe Box');
  
  // Estado para la receta seleccionada (empieza como null)
  protected selectedRecipe = signal<Recipe | null>(null);

  onRecipeSelected(recipe: Recipe) {
    this.selectedRecipe.set(recipe);
    // Scroll suave hacia arriba para ver el detalle
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleToggleFavorite(recipe: Recipe) {
    console.log(`Receta marcada como favorita: ${recipe.title}`);
    alert(`¡Has marcado "${recipe.title}" como favorita!`);
  }
}

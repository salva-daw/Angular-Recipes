import { Component, inject, ChangeDetectionStrategy, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RecipeService } from '../../core/services/recipe.service';
import { Recipe } from '../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  imports: [NgOptimizedImage],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent {
  private recipeService = inject(RecipeService);
  
  // Accedemos al signal de recetas del servicio
  public recipes = this.recipeService.recipes;

  // Definimos el output para avisar al padre de la selección
  recipeSelected = output<Recipe>();

  selectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  deleteRecipe(event: Event, id: string) {
    // Evitamos que el clic en el botón de borrar también seleccione la receta
    event.stopPropagation();
    this.recipeService.deleteRecipe(id);
  }
}

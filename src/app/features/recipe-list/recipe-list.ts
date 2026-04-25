import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RecipeService } from '../../core/services/recipe.service';

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

  deleteRecipe(id: string) {
    this.recipeService.deleteRecipe(id);
  }
}

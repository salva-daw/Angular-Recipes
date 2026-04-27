import { Component, input, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './recipe-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  private recipeService = inject(RecipeService);

  // Recibimos el 'id' directamente desde la URL gracias a withComponentInputBinding
  id = input<string>();

  // Buscamos la receta automáticamente cuando cambia el ID
  recipe = computed(() => {
    const recipeId = this.id();
    return this.recipeService.recipes().find(r => r.id === recipeId) || null;
  });
}

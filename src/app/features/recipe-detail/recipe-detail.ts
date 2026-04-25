import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Recipe } from '../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  imports: [NgOptimizedImage],
  templateUrl: './recipe-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  // Recibimos la receta como un input (Signal-based input)
  recipe = input<Recipe | null>(null);
}

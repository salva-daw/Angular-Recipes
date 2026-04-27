import { Component, inject, ChangeDetectionStrategy, output, signal, computed } from '@angular/core';
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
  
  // Término de búsqueda (Signal reactivo)
  searchTerm = signal('');

  // Signal derivado: se actualiza automáticamente cuando cambia searchTerm o las recetas del servicio
  filteredRecipes = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allRecipes = this.recipeService.recipes();
    
    if (!term) return allRecipes;

    return allRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(term) || 
      recipe.category.toLowerCase().includes(term)
    );
  });

  // Definimos el output para avisar al padre de la selección
  recipeSelected = output<Recipe>();

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  selectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  deleteRecipe(event: Event, id: string) {
    // Evitamos que el clic en el botón de borrar también seleccione la receta
    event.stopPropagation();
    this.recipeService.deleteRecipe(id);
  }
}

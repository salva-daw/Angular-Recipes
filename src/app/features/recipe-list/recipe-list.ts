import { Component, inject, ChangeDetectionStrategy, output, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { NotificationService } from '../../core/services/notification.service';
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
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  
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

  // Definimos los outputs
  recipeSelected = output<Recipe>();
  toggleFavorite = output<Recipe>();
  recipeDeleted = output<string>();

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  selectRecipe(recipe: Recipe) {
    // 1. Avisamos que se seleccionó (por si algún padre aún escucha)
    this.recipeSelected.emit(recipe);
    
    // 2. Navegamos programáticamente a la ruta de detalle
    this.router.navigate(['/recipe', recipe.id]);
  }

  onToggleFavorite(event: Event, recipe: Recipe) {
    event.stopPropagation(); // Evitamos seleccionar la receta al pulsar el corazón
    this.toggleFavorite.emit(recipe);
    this.notificationService.show(`"${recipe.title}" añadida a favoritos`, 'info');
  }

  deleteRecipe(event: Event, recipe: Recipe) {
    // Evitamos que el clic en el botón de borrar también seleccione la receta
    event.stopPropagation();
    
    const confirmed = confirm(`¿Estás seguro de que quieres eliminar la receta "${recipe.title}"?`);
    
    if (confirmed) {
      this.recipeService.deleteRecipe(recipe.id);
      this.recipeDeleted.emit(recipe.id);
      this.notificationService.show('Receta eliminada correctamente', 'success');
    }
  }
}

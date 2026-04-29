import { Component, input, ChangeDetectionStrategy, inject, computed, signal, effect } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { AiAssistantService } from '../../core/services/ai-assistant.service';

@Component({
  selector: 'app-recipe-detail',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './recipe-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent {
  private recipeService = inject(RecipeService);
  public aiAssistant = inject(AiAssistantService);

  // Recibimos el 'id' directamente desde la URL gracias a withComponentInputBinding
  id = input<string>();

  // Signal para almacenar la respuesta de la IA
  aiAdvice = signal<string | null>(null);

  // Buscamos la receta automáticamente cuando cambia el ID
  recipe = computed(() => {
    const recipeId = this.id();
    return this.recipeService.recipes().find(r => r.id === recipeId) || null;
  });

  constructor() {
    // Limpiamos el consejo anterior si cambiamos de receta
    effect(() => {
      this.id(); // Dependencia del signal id
      this.aiAdvice.set(null);
    });
  }

  /**
   * Solicita un consejo a la IA basado en la receta actual
   */
  async askAi(type: 'diet' | 'pairing' | 'tips') {
    const currentRecipe = this.recipe();
    if (currentRecipe) {
      const advice = await this.aiAssistant.getAiAdvice(currentRecipe, type);
      this.aiAdvice.set(advice);
    }
  }
}

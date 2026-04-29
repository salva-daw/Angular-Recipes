import { Injectable, signal } from '@angular/core';
import { Recipe } from '../models/recipe.model';

export interface AiResponse {
  type: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {
  // Signal para gestionar el estado de carga
  isLoading = signal(false);

  /**
   * Genera un prompt estructurado que se enviaría a una IA (ej. Gemini)
   */
  generatePrompt(recipe: Recipe): string {
    return `
      Actúa como un chef experto. Analiza la siguiente receta:
      Título: ${recipe.title}
      Categoría: ${recipe.category}
      Ingredientes: ${recipe.ingredients.join(', ')}
      Instrucciones: ${recipe.instructions.join(' ')}
      
      Por favor, proporciona consejos sobre cómo hacerla más saludable, 
      un maridaje de bebidas y una variante creativa.
    `.trim();
  }

  /**
   * Simula una llamada a una API de IA con un retardo
   */
  async getAiAdvice(recipe: Recipe, type: 'diet' | 'pairing' | 'tips'): Promise<string> {
    this.isLoading.set(true);
    
    // Simulamos latencia de red
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses: Record<string, string> = {
      diet: this.getDietAdvice(recipe),
      pairing: this.getPairingAdvice(recipe),
      tips: this.getChefTips(recipe)
    };

    this.isLoading.set(false);
    return responses[type] || 'No tengo consejos específicos para esta receta en este momento.';
  }

  private getDietAdvice(recipe: Recipe): string {
    if (recipe.category === 'dessert') {
      return 'Para una versión más ligera, puedes sustituir el azúcar refinado por eritritol o dátiles triturados.';
    }
    if (recipe.ingredients.some(i => i.toLowerCase().includes('carne') || i.toLowerCase().includes('pollo'))) {
      return 'Puedes hacer esta receta vegetariana sustituyendo la proteína animal por tofu firme marinado o seitán.';
    }
    return 'Añade más vegetales de hoja verde como espinacas o kale al final para aumentar el contenido de fibra y micronutrientes.';
  }

  private getPairingAdvice(recipe: Recipe): string {
    switch (recipe.category) {
      case 'breakfast': return 'Combina perfectamente con un zumo de naranja natural o un café de especialidad con notas cítricas.';
      case 'lunch': return 'Un té frío con limón o agua infusionada con pepino y menta resaltará los sabores frescos.';
      case 'dinner': return 'Un vino blanco seco o una cerveza artesana ligera acompañarían muy bien este plato.';
      case 'dessert': return 'Un vino dulce de postre o una infusión de frutos rojos sería el cierre ideal.';
      default: return 'Agua mineral con gas y una rodaja de lima es la opción más versátil.';
    }
  }

  private getChefTips(recipe: Recipe): string {
    return `Truco de Chef: Asegúrate de que todos los ingredientes estén a temperatura ambiente antes de empezar para lograr una textura perfecta en el ${recipe.title}.`;
  }
}

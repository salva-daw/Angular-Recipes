import { Injectable, signal, computed } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Estado privado con Signals para almacenar las recetas
  private recipesState = signal<Recipe[]>([
    {
      id: '1',
      title: 'Guacamole Casero',
      description: 'Un guacamole cremoso y delicioso, perfecto para acompañar tus platos.',
      ingredients: ['3 Aguacates maduros', '1 Tomate', '1/2 Cebolla', 'Cilantro fresco', 'Lima', 'Sal'],
      instructions: [
        'Machaca los aguacates en un bol.',
        'Pica el tomate y la cebolla finamente.',
        'Mezcla todo con el zumo de lima y el cilantro.',
        'Sazona al gusto.'
      ],
      category: 'lunch',
      rating: 4.8,
      image: '/assets/images/guacamole.jpg'
    },
    {
      id: '2',
      title: 'Tortitas de Avena',
      description: 'Desayuno saludable y energético para empezar bien el día.',
      ingredients: ['1 taza de Avena', '1 Plátano maduro', '2 Huevos', 'Canela', 'Leche vegetal'],
      instructions: [
        'Tritura todos los ingredientes en una batidora.',
        'Calienta una sartén antiadherente.',
        'Cocina las tortitas por ambos lados hasta que doren.'
      ],
      category: 'breakfast',
      rating: 4.5,
      image: '/assets/images/tortitas.jpg'
    }
  ]);

  // Exponemos el signal de forma pública y de solo lectura usando computed
  public recipes = computed(() => this.recipesState());

  constructor() { }

  /**
   * Añade una nueva receta al estado
   */
  addRecipe(recipe: Recipe) {
    this.recipesState.update(current => [...current, recipe]);
  }

  /**
   * Elimina una receta por su ID
   */
  deleteRecipe(id: string) {
    this.recipesState.update(current => current.filter(r => r.id !== id));
  }

  /**
   * Actualiza una receta existente
   */
  updateRecipe(id: string, updatedRecipe: Recipe) {
    this.recipesState.update(current => 
      current.map(r => r.id === id ? { ...updatedRecipe, id } : r)
    );
  }
}

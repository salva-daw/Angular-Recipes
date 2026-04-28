import { Injectable, signal, computed, effect } from '@angular/core';
import { Recipe } from '../models/recipe.model';

const STORAGE_KEY = 'recipes_data';

const INITIAL_RECIPES: Recipe[] = [
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
  },
  {
    id: '3',
    title: 'Pasta Carbonara Auténtica',
    description: 'La receta clásica italiana sin nata, solo con huevo y pecorino.',
    ingredients: ['200g Espaguetis', '100g Guanciale o Panceta', '2 Huevos grandes', '50g Queso Pecorino', 'Pimienta negra'],
    instructions: [
      'Hierve la pasta en agua con sal.',
      'Dora el guanciale en una sartén hasta que esté crujiente.',
      'Bate los huevos con el queso y mucha pimienta.',
      'Mezcla la pasta caliente con el guanciale y luego añade la mezcla de huevo fuera del fuego para que no cuaje.'
    ],
    category: 'dinner',
    rating: 4.9,
    image: '/assets/images/pasta.jpg'
  },
  {
    id: '4',
    title: 'Ensalada César Premium',
    description: 'Ensalada fresca con pollo a la parrilla, picatostes y salsa casera.',
    ingredients: ['Pechuga de pollo', 'Lechuga romana', 'Pan para picatostes', 'Queso Parmesano', 'Anchoas', 'Salsa César'],
    instructions: [
      'Cocina el pollo a la plancha y córtalo en tiras.',
      'Tuesta los dados de pan con un poco de ajo y aceite.',
      'Lava y trocea la lechuga.',
      'Mezcla todo en un bol grande, añade el parmesano y la salsa.'
    ],
    category: 'lunch',
    rating: 4.6,
    image: '/assets/images/ensalada.jpg'
  },
  {
    id: '5',
    title: 'Brownie de Chocolate Amargo',
    description: 'Un postre intenso y húmedo por dentro para los amantes del cacao.',
    ingredients: ['200g Chocolate 70%', '150g Mantequilla', '3 Huevos', '150g Azúcar', '100g Harina', 'Nueces'],
    instructions: [
      'Derrite el chocolate con la mantequilla.',
      'Bate los huevos con el azúcar hasta que doblen su volumen.',
      'Incorpora el chocolate derretido y luego la harina suavemente.',
      'Añade las nueces y hornea a 180°C durante 20-25 minutos.'
    ],
    category: 'dessert',
    rating: 4.7,
    image: '/assets/images/brownie.jpg'
  }
];

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Estado privado con Signals para almacenar las recetas
  private recipesState = signal<Recipe[]>(this.loadFromStorage());

  // Exponemos el signal de forma pública y de solo lectura usando computed
  public recipes = computed(() => this.recipesState());

  constructor() {
    // Effect que guarda automáticamente en localStorage cuando cambia el estado
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.recipesState()));
    });
  }

  /**
   * Carga las recetas desde localStorage o devuelve las iniciales
   */
  private loadFromStorage(): Recipe[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_RECIPES;
  }

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

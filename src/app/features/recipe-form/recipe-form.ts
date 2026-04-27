import { Component, inject, ChangeDetectionStrategy, input, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { Recipe } from '../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './recipe-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeFormComponent {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);

  // Recibimos el ID opcionalmente (si viene, estamos editando)
  id = input<string>();

  // Título dinámico
  isEditMode = false;

  // Definimos la estructura del formulario
  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['lunch', [Validators.required]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
  });

  constructor() {
    // Reaccionamos al cambio de ID para cargar los datos si es edición
    effect(() => {
      const recipeId = this.id();
      if (recipeId) {
        const recipe = this.recipeService.recipes().find(r => r.id === recipeId);
        if (recipe) {
          this.isEditMode = true;
          this.recipeForm.patchValue({
            title: recipe.title,
            description: recipe.description,
            category: recipe.category,
            rating: recipe.rating
          });
        }
      }
    });
  }

  // Método auxiliar para mostrar errores solo cuando el usuario ha interactuado
  isFieldInvalid(fieldName: string): boolean {
    const control = this.recipeForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const recipeId = this.id();

      if (this.isEditMode && recipeId) {
        // Obtenemos la receta original para no perder ingredientes/instrucciones
        const originalRecipe = this.recipeService.recipes().find(r => r.id === recipeId);
        if (originalRecipe) {
          const updatedRecipe: Recipe = {
            ...originalRecipe,
            title: formValue.title ?? originalRecipe.title,
            description: formValue.description ?? originalRecipe.description,
            category: (formValue.category as Recipe['category']) ?? originalRecipe.category,
            rating: formValue.rating ?? originalRecipe.rating
          };
          this.recipeService.updateRecipe(recipeId, updatedRecipe);
        }
      } else {
        const newRecipe: Recipe = {
          id: crypto.randomUUID(),
          title: formValue.title ?? '',
          description: formValue.description ?? '',
          category: (formValue.category as Recipe['category']) ?? 'lunch',
          rating: formValue.rating ?? 5,
          ingredients: [],
          instructions: []
        };
        this.recipeService.addRecipe(newRecipe);
      }
      
      this.router.navigate(['/']);
    }
  }
}

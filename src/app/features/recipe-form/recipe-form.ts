import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';

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

  // Definimos la estructura del formulario
  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['lunch', [Validators.required]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
  });

  // Método auxiliar para mostrar errores solo cuando el usuario ha interactuado
  isFieldInvalid(fieldName: string): boolean {
    const control = this.recipeForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const newRecipe = {
        ...this.recipeForm.value,
        id: crypto.randomUUID(),
        ingredients: [], // Lo ampliaremos en el Paso 18
        instructions: []  // Lo ampliaremos en el Paso 18
      };
      
      // En un caso real, esto sería una interfaz completa, pero por ahora simplificamos
      this.recipeService.addRecipe(newRecipe as any);
      this.router.navigate(['/']);
    }
  }
}

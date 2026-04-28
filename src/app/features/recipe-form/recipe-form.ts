import { Component, inject, ChangeDetectionStrategy, input, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { NotificationService } from '../../core/services/notification.service';
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
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  id = input<string>();
  isEditMode = false;

  // Estructura del formulario con FormArrays
  recipeForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    category: ['lunch', [Validators.required]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    ingredients: this.fb.array([this.fb.control('', Validators.required)]),
    instructions: this.fb.array([this.fb.control('', Validators.required)])
  });

  // Getters para facilitar el acceso desde el template
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  constructor() {
    effect(() => {
      const recipeId = this.id();
      if (recipeId) {
        const recipe = this.recipeService.recipes().find(r => r.id === recipeId);
        if (recipe) {
          this.isEditMode = true;
          
          // Limpiamos los arrays por defecto antes de cargar los de la receta
          this.ingredients.clear();
          this.instructions.clear();

          // Añadimos un control por cada ingrediente/instrucción
          recipe.ingredients.forEach(ing => this.ingredients.push(this.fb.control(ing, Validators.required)));
          recipe.instructions.forEach(ins => this.instructions.push(this.fb.control(ins, Validators.required)));

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

  // Métodos para gestionar los elementos de los arrays
  addItem(array: FormArray) {
    array.push(this.fb.control('', Validators.required));
  }

  removeItem(array: FormArray, index: number) {
    if (array.length > 1) {
      array.removeAt(index);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.recipeForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const formValue = this.recipeForm.value;
      const recipeId = this.id();

      const recipeData: Recipe = {
        id: this.isEditMode && recipeId ? recipeId : crypto.randomUUID(),
        title: formValue.title ?? '',
        description: formValue.description ?? '',
        category: (formValue.category as Recipe['category']) ?? 'lunch',
        rating: formValue.rating ?? 5,
        ingredients: (formValue.ingredients as string[]) ?? [],
        instructions: (formValue.instructions as string[]) ?? []
      };

      if (this.isEditMode && recipeId) {
        this.recipeService.updateRecipe(recipeId, recipeData);
        this.notificationService.show('Receta actualizada con éxito');
      } else {
        this.recipeService.addRecipe(recipeData);
        this.notificationService.show('¡Receta creada con éxito!');
      }
      
      this.router.navigate(['/']);
    }
  }
}

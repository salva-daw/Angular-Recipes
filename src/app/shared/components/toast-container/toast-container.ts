import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-xs">
      @for (toast of notificationService.notifications(); track toast.id) {
        <div 
          [class]="getToastClasses(toast.type)"
          role="alert"
        >
          <div class="flex items-center gap-3">
            @if (toast.type === 'success') {
              <span class="text-xl">✅</span>
            } @else if (toast.type === 'error') {
              <span class="text-xl">❌</span>
            } @else {
              <span class="text-xl">ℹ️</span>
            }
            <p class="text-sm font-medium">{{ toast.message }}</p>
          </div>
          <button 
            (click)="notificationService.remove(toast.id)"
            class="ml-auto text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  protected notificationService = inject(NotificationService);

  getToastClasses(type: string): string {
    const base = 'flex items-center p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 transform translate-x-0';
    const types = {
      success: 'bg-green-50 border-green-500 text-green-800',
      error: 'bg-red-50 border-red-500 text-red-800',
      info: 'bg-blue-50 border-blue-500 text-blue-800'
    };
    return `${base} ${types[type as keyof typeof types] || types.info}`;
  }
}

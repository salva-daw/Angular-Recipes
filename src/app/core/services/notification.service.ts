import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Signal que contiene la lista de notificaciones activas
  notifications = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const id = crypto.randomUUID();
    const newToast: Toast = { id, message, type };
    
    // Añadimos la notificación
    this.notifications.update(prev => [...prev, newToast]);

    // La eliminamos automáticamente tras 3 segundos
    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: string) {
    this.notifications.update(prev => prev.filter(t => t.id !== id));
  }
}

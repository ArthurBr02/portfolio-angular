import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
    id: number;
    type: ToastType;
    message: string;
    duration?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts = signal<Toast[]>([]);
    private nextId = 0;

    readonly getToasts = this.toasts.asReadonly();

    show(message: string, type: ToastType = 'info', duration: number = 5000) {
        const toast: Toast = {
            id: this.nextId++,
            type,
            message,
            duration
        };

        this.toasts.update(toasts => [...toasts, toast]);

        if (duration > 0) {
            setTimeout(() => this.remove(toast.id), duration);
        }
    }

    success(message: string, duration: number = 5000) {
        this.show(message, 'success', duration);
    }

    error(message: string, duration: number = 7000) {
        this.show(message, 'error', duration);
    }

    warning(message: string, duration: number = 6000) {
        this.show(message, 'warning', duration);
    }

    info(message: string, duration: number = 5000) {
        this.show(message, 'info', duration);
    }

    remove(id: number) {
        this.toasts.update(toasts => toasts.filter(t => t.id !== id));
    }

    clear() {
        this.toasts.set([]);
    }
}

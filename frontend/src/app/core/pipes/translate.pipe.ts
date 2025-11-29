import { Pipe, PipeTransform, effect, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false // Make it impure so it updates when language changes
})
export class TranslatePipe implements PipeTransform {
    private updateTrigger = signal(0);

    constructor(private translationService: TranslationService) {
        // Watch for language changes and trigger pipe update
        effect(() => {
            // Access the signal to create dependency
            this.translationService.currentLanguage();
            // Trigger update
            this.updateTrigger.update(v => v + 1);
        });
    }

    transform(key: string, params?: Record<string, string | number>): string {
        // Access updateTrigger to ensure change detection
        this.updateTrigger();
        return this.translationService.translate(key, params);
    }
}

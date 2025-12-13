import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationAdminService } from '../../services/translation-admin.service';
import { TranslationData, TranslationService } from '../../services/translation.service';
import { ToastService } from '../../services/toast.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { AddTranslationModal } from '../../components/add-translation-modal/add-translation-modal';

interface TranslationEntry {
    key: string;
    path: string;
    en: string;
    fr: string;
    isEditing: boolean;
}

@Component({
    selector: 'app-admin-translations',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslatePipe, AddTranslationModal],
    templateUrl: './admin-translations.html',
    styleUrls: ['./admin-translations.css', '../admin-shared.css']
})
export class AdminTranslations implements OnInit {
    enTranslations: TranslationData = {};
    frTranslations: TranslationData = {};
    translationEntries = signal<TranslationEntry[]>([]);
    isLoading = signal(false);
    isSaving = signal(false);
    searchQuery = signal('');
    selectedCategory = signal<string>('all');
    showAddModal = signal(false);
    categories = signal<string[]>([]);

    constructor(
        private translationAdminService: TranslationAdminService,
        private toastService: ToastService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.loadTranslations();
    }

    loadTranslations() {
        this.isLoading.set(true);

        // Load both English and French translations
        Promise.all([
            this.translationAdminService.getTranslations('en').toPromise(),
            this.translationAdminService.getTranslations('fr').toPromise()
        ]).then(([enResponse, frResponse]) => {
            if (enResponse && frResponse) {
                this.enTranslations = enResponse.translations;
                this.frTranslations = frResponse.translations;
                this.buildTranslationEntries();
            }
        }).catch(error => {
            console.error('Error loading translations:', error);
            this.toastService.error(this.translationService.translate('admin.translationsPage.errorLoad'));
        }).finally(() => {
            this.isLoading.set(false);
        });
    }

    buildTranslationEntries() {
        const entries: TranslationEntry[] = [];
        const categories = new Set<string>();

        const traverse = (enObj: any, frObj: any, path: string[] = []) => {
            for (const key in enObj) {
                const currentPath = [...path, key];
                const pathString = currentPath.join('.');

                if (typeof enObj[key] === 'object' && enObj[key] !== null) {
                    // Add category
                    categories.add(currentPath[0]);
                    // Recursively traverse nested objects
                    traverse(enObj[key], frObj[key] || {}, currentPath);
                } else {
                    // It's a leaf value
                    entries.push({
                        key: key,
                        path: pathString,
                        en: String(enObj[key] || ''),
                        fr: String(frObj[key] || ''),
                        isEditing: false
                    });
                }
            }
        };

        traverse(this.enTranslations, this.frTranslations);

        this.translationEntries.set(entries);
        this.categories.set(['all', ...Array.from(categories).sort()]);
    }

    filteredEntries() {
        let entries = this.translationEntries();
        const search = this.searchQuery().toLowerCase();
        const category = this.selectedCategory();

        if (category !== 'all') {
            entries = entries.filter(e => e.path.startsWith(category + '.'));
        }

        if (search) {
            entries = entries.filter(e =>
                e.key.toLowerCase().includes(search) ||
                e.path.toLowerCase().includes(search) ||
                e.en.toLowerCase().includes(search) ||
                e.fr.toLowerCase().includes(search)
            );
        }

        return entries;
    }

    toggleEdit(entry: TranslationEntry) {
        entry.isEditing = !entry.isEditing;
    }

    saveTranslations() {
        this.isSaving.set(true);

        // Rebuild the translation objects from the entries
        const newEnTranslations: any = {};
        const newFrTranslations: any = {};

        this.translationEntries().forEach(entry => {
            const keys = entry.path.split('.');

            // Set English value
            let enCurrent = newEnTranslations;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!enCurrent[keys[i]]) {
                    enCurrent[keys[i]] = {};
                }
                enCurrent = enCurrent[keys[i]];
            }
            enCurrent[keys[keys.length - 1]] = entry.en;

            // Set French value
            let frCurrent = newFrTranslations;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!frCurrent[keys[i]]) {
                    frCurrent[keys[i]] = {};
                }
                frCurrent = frCurrent[keys[i]];
            }
            frCurrent[keys[keys.length - 1]] = entry.fr;
        });

        // Save both translations
        Promise.all([
            this.translationAdminService.updateTranslations('en', newEnTranslations).toPromise(),
            this.translationAdminService.updateTranslations('fr', newFrTranslations).toPromise()
        ]).then(async () => {
            // Reload translations in the translation service
            await this.translationService.reloadTranslations();

            this.toastService.success('Translations saved and reloaded successfully!');
            // Mark all as not editing
            this.translationEntries().forEach(e => e.isEditing = false);
        }).catch(error => {
            console.error('Error saving translations:', error);
            this.toastService.error('Failed to save translations');
        }).finally(() => {
            this.isSaving.set(false);
        });
    }

    addNewTranslation() {
        this.showAddModal.set(true);
    }

    onAddTranslation(data: { path: string; enValue: string; frValue: string }) {
        const keys = data.path.split('.');

        // Add new entry
        const newEntry: TranslationEntry = {
            key: keys[keys.length - 1],
            path: data.path,
            en: data.enValue,
            fr: data.frValue,
            isEditing: false
        };

        this.translationEntries.set([...this.translationEntries(), newEntry]);

        // Update categories if needed
        const category = keys[0];
        if (!this.categories().includes(category)) {
            this.categories.set(['all', ...this.categories().filter(c => c !== 'all'), category].sort((a, b) => {
                if (a === 'all') return -1;
                if (b === 'all') return 1;
                return a.localeCompare(b);
            }));
        }

        this.showAddModal.set(false);
        this.toastService.success(this.translationService.translate('admin.translationsPage.successAdd'));
    }

    onCancelAddTranslation() {
        this.showAddModal.set(false);
    }

    getExistingKeys(): string[] {
        return this.translationEntries().map(e => e.path);
    }

    deleteTranslation(entry: TranslationEntry) {
        const confirmMsg = this.translationService.translate('admin.translationsPage.confirmDelete', { path: entry.path });
        if (!confirm(confirmMsg)) {
            return;
        }

        const filtered = this.translationEntries().filter(e => e.path !== entry.path);
        this.translationEntries.set(filtered);
        this.toastService.success(this.translationService.translate('admin.translationsPage.successRemove'));
    }

    exportTranslations() {
        const data = {
            en: this.enTranslations,
            fr: this.frTranslations,
            exportDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `translations-backup-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

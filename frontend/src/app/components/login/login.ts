import { Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
    templateUrl: './login.html',
    styleUrl: './login.css',
    encapsulation: ViewEncapsulation.None
})
export class Login {
    private authService = inject(AuthService);

    usernameControl = new FormControl('', [Validators.required]);
    passwordControl = new FormControl('', [Validators.required]);

    isLoading = signal(false);
    error = signal<string | null>(null);

    onSubmit(event: Event) {
        event.preventDefault();

        if (this.usernameControl.invalid || this.passwordControl.invalid) {
            this.error.set('Please fill in all fields');
            return;
        }

        this.isLoading.set(true);
        this.error.set(null);

        const credentials = {
            username: this.usernameControl.value!,
            password: this.passwordControl.value!
        };

        this.authService.login(credentials).subscribe(success => {
            this.isLoading.set(false);
            if (!success) {
                this.error.set('Invalid username or password');
            }
        });
    }
}

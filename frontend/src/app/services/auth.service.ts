import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private readonly API_URL = environment.authUrl;

    // Signals for reactive state
    readonly isAuthenticated = signal<boolean>(this.hasToken());
    readonly currentUser = signal<any>(null);

    constructor() {
        // Check token validity on startup if needed, or just rely on existence for now
        if (this.hasToken()) {
            // Optional: Verify token with backend
        }
    }

    private hasToken(): boolean {
        if (typeof localStorage !== 'undefined') {
            return !!localStorage.getItem('auth_token');
        }
        return false;
    }

    login(credentials: { username: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${this.API_URL}/login`, credentials).pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('auth_token', response.token);
                    this.isAuthenticated.set(true);
                    this.currentUser.set(response.user);
                    this.router.navigate(['/admin']);
                }
            }),
            map(() => true),
            catchError(error => {
                console.error('Login failed', error);
                return of(false);
            })
        );
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('auth_token');
        }
        return null;
    }
}

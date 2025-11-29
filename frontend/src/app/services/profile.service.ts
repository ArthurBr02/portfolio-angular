import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../core/models/profile.model';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/profile`;

    private readonly profile = signal<Profile | null>(null);

    constructor() {
        this.loadProfile();
    }

    loadProfile() {
        this.http.get<Profile>(this.API_URL).subscribe({
            next: (data) => {
                // Ensure profilePicture has full URL if it's a relative path
                if (data.profilePicture && !data.profilePicture.startsWith('http')) {
                    data.profilePicture = `${environment.baseUrl}${data.profilePicture}`;
                }
                this.profile.set(data);
            },
            error: (err) => console.error('Error loading profile:', err)
        });
    }

    updateProfile(formData: FormData) {
        return this.http.put(this.API_URL, formData).pipe(
            tap((res: any) => {
                // Update local signal with new data
                const current = this.profile();
                if (current) {
                    // We need to merge the formData updates into the current profile
                    // This is a bit tricky with FormData, so we'll just reload or trust the response
                    // The response contains the new profilePicture path if updated
                    if (res.profilePicture) {
                        // Check if it needs prefix
                        let pic = res.profilePicture;
                        if (!pic.startsWith('http')) {
                            pic = `${environment.baseUrl}${pic}`;
                        }
                        this.profile.update(p => p ? ({ ...p, profilePicture: pic }) : null);
                    }
                    // For other fields, we should probably reload to be safe or parse formData
                    this.loadProfile();
                }
            })
        );
    }

    getProfile = this.profile.asReadonly();
}

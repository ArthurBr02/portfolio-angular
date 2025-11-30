import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpClient);
    private readonly API_URL = `${environment.apiUrl}/contact`;

    sendContactMessage(data: ContactFormData): Observable<ContactResponse> {
        return this.http.post<ContactResponse>(this.API_URL, data);
    }
}

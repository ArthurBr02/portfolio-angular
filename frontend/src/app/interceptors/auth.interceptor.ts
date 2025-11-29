import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    // List of public endpoints that don't require authentication
    const publicEndpoints = [
        '/api/projects',
        '/api/education',
        '/api/experience',
        '/api/user',
        '/api/skill-categories',
        '/api/auth/login'
    ];

    // Check if the request URL matches any public endpoint
    const isPublicEndpoint = publicEndpoints.some(endpoint => req.url.includes(endpoint));

    // Only attach token if we have one and it's not a public endpoint
    if (token && !isPublicEndpoint) {
        console.log('Attaching token to request:', req.url);
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloned);
    }

    // If we have a token and it's a public endpoint, still attach it (backend will ignore if not needed)
    // This is useful for endpoints that can work with or without auth
    if (token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloned);
    }

    // No token and public endpoint - just proceed without warning
    return next(req);
};

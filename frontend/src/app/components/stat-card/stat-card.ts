import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stat-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stat-card.html',
    styleUrl: './stat-card.css'
})
export class StatCard {
    private router = inject(Router);

    @Input() icon: string = '';
    @Input() title: string = '';
    @Input() value: number = 0;
    @Input() iconClass: string = '';
    @Input() link: string = '';

    navigateTo() {
        if (this.link) {
            this.router.navigate([this.link]);
        }
    }
}

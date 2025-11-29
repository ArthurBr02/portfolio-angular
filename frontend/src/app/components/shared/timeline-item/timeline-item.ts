import { Component, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-timeline-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './timeline-item.html',
    styleUrl: './timeline-item.css',
    encapsulation: ViewEncapsulation.None
})
export class TimelineItem {
    title = input.required<string>();
    subtitle = input.required<string>();
    period = input.required<string>();
}

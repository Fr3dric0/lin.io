import { Component, Input } from '@angular/core';

@Component({
    selector: 'lin-header',
    templateUrl: './lin-header.component.html',
    styleUrls: ['./lin-header.component.scss']
})
export class LinHeaderComponent {
    @Input() title: string;
}

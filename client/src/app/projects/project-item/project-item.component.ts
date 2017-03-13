import { Component, Input } from '@angular/core';

@Component({
    selector: 'lin-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {

    @Input() name: string;
    @Input() thumb: string;
    @Input() description: string;
    @Input() path: string;


}

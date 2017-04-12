import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
    selector: 'lin-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    projects;

    constructor (private ps: ProjectsService) {}

    ngOnInit() {
        this.ps.find().subscribe(
            projects => this.projects = projects,
            err => console.error(err)
        );
    }
}

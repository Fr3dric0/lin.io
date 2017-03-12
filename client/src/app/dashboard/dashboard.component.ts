import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';

@Component({
    selector: 'lin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    projects: any[];

    constructor(private ps: ProjectsService) {}

    ngOnInit() {
        this.ps.find()
            .subscribe( data => this.projects = data, err => console.error(err));
    }
}

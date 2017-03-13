import { ProjectsComponent } from './projects.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectsService } from './projects.service';



export const PROJECTS_DECLARATIONS = [
    ProjectsComponent,
    ProjectItemComponent
];

export const PROJECTS_PROVIDERS = [
    ProjectsService
];
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map'

@Injectable()
export class ProjectsService {

    constructor(private http: Http) {}

    find(): Observable<any> {
        return this.http
            .get(`/api/projects`)
            .map(res => res.json());
    }
}
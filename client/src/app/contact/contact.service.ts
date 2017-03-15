import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ContactPayload } from '../models/contact';
import { Observable } from 'rxjs';

@Injectable()
export class ContactService {
    private path: string = '/api/contact';

    constructor(private http:Http) { }

    mail(payload: ContactPayload): Observable<any> {
        return this.http.post(this.path, payload)
            .map(res => res.json());
    }
}
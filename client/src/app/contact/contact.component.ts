import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { Http } from '@angular/http';

@Component({
    selector: 'lin-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    sitekey: string = '6LeC5xgUAAAAAFsU03EmPwNSjTLY2fqk6upKPMGR';
    verified: boolean = false;


    constructor(private http: Http) {}

    ngOnInit(): void {
    }


    submit(res: string) {
        console.log(res);

        this.http.post('/api/contact', {
            email: 'ffl_52@hotmail.com',
            captcha: res
        })
            .map(res => res.json())
            .subscribe((data) => {
                console.log(data);
            }, (err) => console.error(err.json()));
    }
}

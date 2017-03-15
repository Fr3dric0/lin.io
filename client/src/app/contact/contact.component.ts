import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
    selector: 'lin-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    sitekey: string = '6LeC5xgUAAAAAFsU03EmPwNSjTLY2fqk6upKPMGR';
    verified: boolean = false;

    form: FormGroup;

    constructor(private cs: ContactService,
                private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', []],
            email: ['', [<any>Validators.required, <any>Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
            subject: ['', [<any>Validators.required]],
            message: ['', [<any>Validators.required]]
        });
    }


    submit(values, captcha: string) {

        values['captcha'] = captcha; // Append captcha

        this.cs.mail(values)
            .subscribe((data) => {
                console.log(data);
            }, (err) => console.error(err.json()));
    }
}

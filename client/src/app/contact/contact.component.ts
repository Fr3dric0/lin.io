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
    feedback:string;
    success = 0;

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

        this.feedback = 'Sending message';
        this.success = 0;

        this.cs.mail(values)
            .subscribe((data) => {
                this.success = 1;
                this.feedback = 'Message successfully sendt';
            }, (err) => {
                this.success = -1;
                this.feedback = err.status == 418 ?
                    err.json().description :
                    err.json().error;
            });
    }
}

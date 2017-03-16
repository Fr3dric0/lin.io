import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent {
    title = `Lindhagen<br>IT`;

    constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) { }

}
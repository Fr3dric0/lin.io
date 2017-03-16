import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RecaptchaModule } from 'ng2-recaptcha';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

import { AppComponent } from './app.component';
import { SHARED_DECLARATIONS, SHARED_PROVIDERS } from './shared/index';
import { DASHBOARD_DECLARATIONS, DASHBOARD_PROVIDERS } from './dashboard/index';
import { AppRoutingModule } from './app-routing.module';
import { PROJECTS_DECLARATIONS, PROJECTS_PROVIDERS } from './projects/index';
import { CONTACT_DECLARATIONS, CONTACT_PROVIDERS } from './contact/index';

@NgModule({
    declarations: [
        AppComponent,
        ...SHARED_DECLARATIONS,
        ...DASHBOARD_DECLARATIONS,
        ...PROJECTS_DECLARATIONS,
        ...CONTACT_DECLARATIONS
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        RecaptchaModule.forRoot(),
        Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])

    ],
    providers: [
        ...SHARED_PROVIDERS,
        ...DASHBOARD_PROVIDERS,
        ...PROJECTS_PROVIDERS,
        ...CONTACT_PROVIDERS
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

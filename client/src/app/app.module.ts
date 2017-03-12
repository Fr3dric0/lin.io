import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SHARED_DECLARATIONS, SHARED_PROVIDERS } from './shared/index';
import { DASHBOARD_DECLARATIONS, DASHBOARD_PROVIDERS } from './dashboard/index';
import { AppRoutingModule } from './app-routing.module';
import { PROJECTS_DECLARATIONS, PROJECTS_PROVIDERS } from './projects/index';

@NgModule({
    declarations: [
        AppComponent,
        ...SHARED_DECLARATIONS,
        ...DASHBOARD_DECLARATIONS,
        ...PROJECTS_DECLARATIONS
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        ...SHARED_PROVIDERS,
        ...DASHBOARD_PROVIDERS,
        ...PROJECTS_PROVIDERS
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

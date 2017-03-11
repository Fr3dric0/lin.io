import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SHARED_DECLARATIONS, SHARED_PROVIDERS } from './shared/index';
import { DASHBOARD_DECLARATIONS } from './dashboard/index';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        ...SHARED_DECLARATIONS,
        ...DASHBOARD_DECLARATIONS
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        ...SHARED_PROVIDERS,
        ...DASHBOARD_DECLARATIONS
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

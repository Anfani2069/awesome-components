import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {SocialMediaModule} from "../social-media/social-media.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class CoreModule {
}

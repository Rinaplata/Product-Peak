import { Component } from '@angular/core';
import { LoginComponent } from "../../../auth/login/login.component";

@Component({
    selector: 'app-hero-banner',
    standalone: true,
    templateUrl: './hero-banner.component.html',
    styleUrl: './hero-banner.component.css',
    imports: [LoginComponent]
})
export class HeroBannerComponent {

}

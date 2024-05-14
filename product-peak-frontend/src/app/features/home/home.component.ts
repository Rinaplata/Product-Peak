import { Component } from '@angular/core';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

import { Component } from '@angular/core';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroBannerComponent, ProductDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

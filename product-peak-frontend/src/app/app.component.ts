import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailsComponent } from './features/products/product-details/product-details.component';


@NgModule({
  imports: [],
  exports: [],
  declarations: [Component],
  providers: [],
})
export class NameModule { }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductDetailsComponent,


  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'product-peak-frontend';
}


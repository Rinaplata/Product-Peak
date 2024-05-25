import { Component } from '@angular/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PublishedProductsComponent } from '../published-products/published-products.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';

interface Product {
  image: string;
  title: string;
  description: string;
  comments: number;
  likes: number;
}

@Component({
  selector: 'app-top-rated-products',
  standalone: true,
  imports: [ContextMenuModule, PublishedProductsComponent, PanelModule, ButtonModule, AvatarModule, CardModule],
  templateUrl: './top-rated-products.component.html',
  styleUrl: './top-rated-products.component.css'
})
export class TopRatedProductsComponent {
  topRatedProducts: Product[] = [];

  constructor() { }

  ngOnInit() {
/*     this.getProducts().subscribe((data: Product[]) => {
      this.topRatedProducts = data.sort((a, b) => b.likes - a.likes).slice(0, 5); // Por ejemplo, los 5 productos más calificados
    }); */
  }

  getProducts(){

  }
}

import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-published-products',
  standalone: true,
  imports: [PanelModule,AvatarModule, ButtonModule, CardModule],
  templateUrl: './published-products.component.html',
  styleUrl: './published-products.component.css'

})
export class PublishedProductsComponent {

  @Input() productName: string = 'Product Name';
  @Input() productDescription: string = 'Product Description';

  publishedProducts: Product[] = [];

  products = [
    {
      productName: 'Product 1',
      productDescription: 'Description for product 1',
    },
    {
      productName: 'Product 2',
      productDescription: 'Description for product 2',
    },
  ]
}

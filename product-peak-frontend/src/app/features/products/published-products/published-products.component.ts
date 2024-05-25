import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './published-products.component.html',
  styleUrl: './published-products.component.css'
})
export class PublishedProductsComponent {
  publishedProducts: Product[] = [];

  constructor() { }

  ngOnInit() {
/*   this.getPublishedProducts().subscribe((data: Product[]) => {
      this.publishedProducts = data;
    }); */
  }

  getPublishedProducts(){

  }
}

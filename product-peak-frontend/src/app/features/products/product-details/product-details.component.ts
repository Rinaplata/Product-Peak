import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';

interface Product {
  image: string;
  title: string;
  description: string;
  comments: number;
  likes: number;
}


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [ CommonModule, CardModule, ContextMenuModule, RippleModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent  implements OnInit  {
  @ViewChild('cm') cm: ContextMenu | undefined;
  items: MenuItem[] | undefined;
  selectedId!: string;

  products = [
    {
      image:  'assets/images/refe1.png',
      title: 'Audioblogs',
      description: 'Listen to any web article in your podcast player',
      comments: 212,
      likes: 2469,
    }
  ];



  ngOnInit() {

  }
  onContextMenu(event: MouseEvent, product: any) {
    event.preventDefault();
    console.log(product);
  }
    onHide() {
    }
}

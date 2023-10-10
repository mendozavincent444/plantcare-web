import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyProductsService } from '../buy-products.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: BuyProductsService
  ) {

  }


  ngOnInit(): void {
    this.initializeProducts();
  }

  private initializeProducts() {
    this.productService.getAllProducts().subscribe(data => this.products = data);
  }

  onIncrementQuantity(product: Product) {
    product.quantity++;
  }

  onDecrementQuantity(product: Product) {
    if (product.quantity == 0) {
      return;
    }
    product.quantity--;
  }

  onDetails(productName: string) {
    this.router.navigate([`../product/${productName}`], { relativeTo: this.route });
  }

  onSaveOrder() {
    this.productService.saveOrder(this.products);
  }
}

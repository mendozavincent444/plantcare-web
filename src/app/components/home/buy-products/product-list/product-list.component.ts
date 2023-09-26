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
    private buyProductsService: BuyProductsService
  ) {

  }


  ngOnInit(): void {
    this.buyProductsService.products$.subscribe((products) => {
      this.products = products;
    });
  }

  onDetails(productName: string) {
    this.router.navigate([`../product/${productName}`], { relativeTo: this.route });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressDto } from 'src/app/shared/payload/address-dto';
import { OrderItemDto } from 'src/app/shared/payload/order-item-dto';
import { PurchaseDto } from 'src/app/shared/payload/purchase-dto';
import { BuyProductsService } from '../buy-products.service';
import { Product } from 'src/app/shared/models/product';
import { ManageTransactionsService } from '../../manage-transactions/manage-transactions.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm: FormGroup;

  constructor(
    private productService: BuyProductsService,
    private manageTransactions: ManageTransactionsService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initializeCheckoutForm();

  }


  private initializeCheckoutForm() {
    this.checkoutForm = new FormGroup({
      "streetShippingAddress": new FormControl(null, Validators.required),
      "cityShippingAddress": new FormControl(null, Validators.required),
      "provinceShippingAddress": new FormControl(null, Validators.required),
      "zipCodeShippingAddress": new FormControl(null, Validators.required),
      "streetBillingAddress": new FormControl(null, Validators.required),
      "cityBillingAddress": new FormControl(null, Validators.required),
      "provinceBillingAddress": new FormControl(null, Validators.required),
      "zipCodeBillingAddress": new FormControl(null, Validators.required),
      "paymentMethod": new FormControl("", Validators.required)
    });
  }

  get streetShippingAddress() {
    return this.checkoutForm.controls["streetShippingAddress"];
  }

  get cityShippingAddress() {
    return this.checkoutForm.controls["cityShippingAddress"];
  }

  get provinceShippingAddress() {
    return this.checkoutForm.controls["provinceShippingAddress"];
  }

  get zipCodeShippingAddress() {
    return this.checkoutForm.controls["zipCodeShippingAddress"];
  }

  get streetBillingAddress() {
    return this.checkoutForm.controls["streetBillingAddress"];
  }

  get cityBillingAddress() {
    return this.checkoutForm.controls["cityBillingAddress"];
  }

  get provinceBillingAddress() {
    return this.checkoutForm.controls["provinceBillingAddress"];
  }

  get zipCodeBillingAddress() {
    return this.checkoutForm.controls["zipCodeBillingAddress"];
  }

  get paymentMethod() {
    return this.checkoutForm.controls["paymentMethod"];
  }

  onPurchase() {
    const streetShippingAddress = this.checkoutForm.value["streetShippingAddress"];
    const cityShippingAddress = this.checkoutForm.value["cityShippingAddress"];
    const provinceShippingAddress = this.checkoutForm.value["provinceShippingAddress"];
    const zipCodeShippingAddress = this.checkoutForm.value["zipCodeShippingAddress"];
    const streetBillingAddress = this.checkoutForm.value["streetBillingAddress"];
    const cityBillingAddress = this.checkoutForm.value["cityBillingAddress"];
    const provinceBillingAddress = this.checkoutForm.value["provinceBillingAddress"];
    const zipCodeBillingAddress = this.checkoutForm.value["zipCodeBillingAddress"];
    const paymentMethod = this.checkoutForm.value["paymentMethod"];

    const shippingAddressDto = new AddressDto(
      cityShippingAddress,
      provinceShippingAddress,
      streetShippingAddress,
      zipCodeShippingAddress
    );

    const billingAddressDto = new AddressDto(
      cityBillingAddress,
      provinceBillingAddress,
      streetBillingAddress,
      zipCodeBillingAddress
    );

    const products: Product[] = this.productService.getAllCartProducts();

    const orderItems: Array<OrderItemDto> = new Array<OrderItemDto>;

    products.forEach(product => {

      orderItems.push(new OrderItemDto(
        product.quantity,
        product.unitPrice,
        product
      ));

    });

    const purchaseDto: PurchaseDto = new PurchaseDto(
      orderItems,
      shippingAddressDto,
      billingAddressDto,
      paymentMethod
    );

    /*
    this.manageTransactions.createTransactionByProduct(purchaseDto).subscribe(data => {
      // fix - receive data
      console.log(data);
      this.productService.emptyCart();
      this.checkoutForm.reset();
      this.router.navigate(["../product-list"], { relativeTo: this.route });
    });*/


    this.manageTransactions.createTransactionByProduct(purchaseDto).subscribe({
      next: data => {
        this.productService.emptyCart();
        this.checkoutForm.reset();
        this.router.navigate(["../product-list"], { relativeTo: this.route });
        Swal.fire(data.message, "Success", "success");
      },
      error: err => {
        Swal.fire(err.error.message, "Error", "error");
      }
    });
  }

  ngOnDestroy(): void {
    this.productService.emptyCart();
  }
}

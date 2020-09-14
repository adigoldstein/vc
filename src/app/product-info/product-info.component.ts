import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../shared/product';
import {ProductService} from '../shared/product.service';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService,
              private fb: FormBuilder) {
  }

  selectedProduct: Product;
  selectedProduct$: Subscription;
  form: FormGroup;

  ngOnInit(): void {
    this.productService.castSelected.subscribe(prod => {
      this.selectedProduct = prod;
      if (this.selectedProduct) {
        this.form = this.fb.group({
          name: [this.selectedProduct.name, [
            Validators.required,
            Validators.maxLength(30)
          ]],
          desc: [this.selectedProduct.desc, Validators.maxLength(200)],
          price: [this.selectedProduct.price, [
            Validators.min(1),
            Validators.required
          ]]
        });
      }

    });

  }

  onSubmit(): void {
    const updatedProduct: Product = {
      id: this.selectedProduct.id,
      name: this.form.value.name,
      desc: this.form.value.desc,
      price: this.form.value.price,
      date: this.selectedProduct.date
    };
    this.productService.editProduct(updatedProduct);
    this.productService.selectProduct(null);
  }



  ngOnDestroy(): void {
    if (this.selectedProduct$) {
      this.selectedProduct$.unsubscribe();
    }
  }

}

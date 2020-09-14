import {Component, OnInit} from '@angular/core';
import {Product} from '../shared/product';
import {ProductService} from '../shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService) {
  }

  productList: Product[];
  filteredList: Product[];
  originalList: Product[];
  searchQuery: string;


  ngOnInit(): void {
    this.searchQuery = '';

    this.productList = this.productService.getProductList();
    this.originalList = this.productService.getProductList();
  }

  onSelectProductClickHander(product: Product): void {
    this.productService.selectProduct(product);
  }

  onDeleteProduct(id: string): void {
    this.productList = this.productList.filter(p => p.id !== Number(id));
    this.productService.updateProductList(this.productList);
  }

  onChangeEvent(event: any): void {
    this.searchQuery = event.target.value.trim();
    if (this.searchQuery.length) {
      this.productList = this.originalList.filter(prod => prod.name.includes(this.searchQuery));
    } else {
      this.productList = this.originalList;

    }
  }

}

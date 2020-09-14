import {Injectable} from '@angular/core';
import {Product} from './product';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() {
  }

  productList: Product[] = [
    {
      id: 54433,
      name: 'Prod1',
      desc: 'Very nice prod1',
      price: 55,
      date: new Date()
    },
    {
      id: 76453,
      name: 'Prod2',
      desc: 'Very nice prod2',
      price: 12,
      date: new Date()
    },
    {
      id: 14353,
      name: 'Prod3',
      desc: 'Very nice prod3',
      price: 264,
      date: new Date()
    },
    {
      id: 54302,
      name: 'Prod4',
      desc: 'Very nice prod4',
      price: 2,
      date: new Date()
    }
  ];
  selectedProduct = new BehaviorSubject<Product>(null);
  castSelected = this.selectedProduct.asObservable();

  getProductList(): Product[] {
    return this.productList;
  }

  updateProductList(newList: Product[]): void {
    this.productList = newList;
  }

  selectProduct(prod: Product): void {
    this.selectedProduct.next(prod);
  }

  editProduct(prod: Product): void {
    const index = this.productList.findIndex(p=> p.id === prod.id);
    this.productList[index] = prod;
  }

}

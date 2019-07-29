import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productDetailList: AngularFireList<any>;

  constructor( private firebase: AngularFireDatabase) { }
  
  getProductDetailList(){
    this.productDetailList = this.firebase.list('productDetails');
  }
  addProduct(productDetails){
    this.productDetailList.push(productDetails);
  }
}

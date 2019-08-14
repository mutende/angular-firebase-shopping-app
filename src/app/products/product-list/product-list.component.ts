import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any[];
  rowIndexArray: any[];
  user: firebase.User;

  product_name_cart: any[];
  product_price_cart: any[];
  product_name : any;
  product_price : any ;
  
  cart : FormGroup;
  constructor(private service: ProductService,   
    private auth: AuthService, 
    private fb: FormBuilder) {
      this.createForm()
     }

  ngOnInit() {
    this.service.productDetailList.snapshotChanges().subscribe(
      list=>{
        this.productList = list.map(item =>{ return item.payload.val();});
        this.rowIndexArray = Array.from(Array(Math.ceil(this.productList.length / 3)).keys());            
      }  
      
    );

    this.auth.getuserState().subscribe(user =>{
      this.user = user;      
    });

    this.product_name_cart = [
      {}
    ]
    this.product_price_cart =[
      {}
    ]
  
  }

  
  createForm() {
    this.cart = this.fb.group({
      p_name: [''],
      p_price: ['']
    });
  }
 
  //buy add to cart
  createCart(p_name, p_price){
    this.product_name = p_name;
    this.product_price = p_price;
    this.product_name_cart.push({name : this.product_name});
    this.product_price_cart.push({name : this.product_price});
   
    console.log(this.product_name_cart);
    console.log(this.product_price_cart);
  }

  
}

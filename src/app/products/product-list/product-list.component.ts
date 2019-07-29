import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any[];
  rowIndexArray: any[];
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.service.productDetailList.snapshotChanges().subscribe(
      list=>{
        this.productList = list.map(item =>{ return item.payload.val();});
        this.rowIndexArray = Array.from(Array(Math.ceil(this.productList.length / 3)).keys());       
      }  
      
    );
  
  }

}

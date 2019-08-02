import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  productList: any[];
  rowIndexArray: any[];
  user: firebase.User;
  constructor(private service: ProductService,   private auth: AuthService) { }

  ngOnInit() {

    this.service.getProductDetailList();
  
    // this.service.productDetailList.snapshotChanges().subscribe(
    //   list=>{
    //     this.productList = list.map(item =>{ return item.payload.val();});
    //     this.rowIndexArray = Array.from(Array(Math.ceil(this.productList.length / 3)).keys());       
    //   }  
      
    // );

    this.auth.getuserState().subscribe(user =>{
      this.user = user;      
    });
  }

}

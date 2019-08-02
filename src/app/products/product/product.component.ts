import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import { ProductService } from 'src/app/shared/product.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



  constructor(
    private storage: AngularFireStorage,
    private service: ProductService,
    private toastr: ToastrService) { }


  ngOnInit() {
    this.resetForm();
  }

  //variables to use 
  img: string ;
  selectedImage: any = null;
  isSubmitted: boolean;
  formTemplate = new FormGroup({    
    product_name : new FormControl('', Validators.required),
    price : new FormControl('',Validators.required),
    quantity : new FormControl('', Validators.required),
    imageurl : new FormControl('', Validators.required),
    product_category: new FormControl('', Validators.required)
  });

  //show image preview
  displayPreview(event : any){
    if( event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any)=>this.img = e.target.result;
      reader.readAsDataURL( event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }else{

      this.img = '/assets/images/default.jpg';
      this.selectedImage = null;

    }
  }

  //form submition
  saveProduct(formValue){
    this.isSubmitted=true;
    if(this.formTemplate.valid){
     
      var filePath = `${formValue.product_category}/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            formValue['imageurl'] = url;
            this.service.addProduct(formValue);
            this.resetForm();
            this.toastr.success('Product added successfully', 'Added Product');
          })
        })
      ).subscribe();

    }
  }

  //form validation
  get formControls(){
    return this.formTemplate['controls']
  }

  resetForm(){
    this.formTemplate.reset();
    this.formTemplate.setValue({
      product_name : '',
      price : '',
      quantity : '',
      imageurl : '',
      product_category:'Electronics'
    });
    this.img = '/assets/images/default.jpg';
    this.isSubmitted = false;
    this.selectedImage = null;
  }

}
